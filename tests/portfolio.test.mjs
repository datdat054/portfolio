import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { beforeEach, describe, it } from 'node:test';
import { JSDOM } from 'jsdom';
import { invokeStaticRequest } from '../scripts/serve.mjs';

const require = createRequire(import.meta.url);
const PortfolioApp = require('../assets/js/script.js');

const ROOT = process.cwd();
const HTML_CONTENT = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const EMBEDDED_CV_CONTENT = fs.readFileSync(path.join(ROOT, 'embedded-cv.html'), 'utf8');
const CSS_CONTENT = fs.readFileSync(path.join(ROOT, 'assets/css/style.css'), 'utf8');

describe('Portfolio HTML & Dual-CV Content Integrity', () => {
  let dom;
  let doc;

  beforeEach(() => {
    dom = new JSDOM(HTML_CONTENT, { url: 'http://localhost:3000/' });
    doc = dom.window.document;
  });

  it('contains Luu Duc Dat Java Backend, Embedded/IoT, GPA 3.1, Year 2004, avatar, and English Merit Award details', () => {
    const bodyText = (doc.body.textContent || '').replace(/\s+/g, ' ');
    assert.ok(doc.title.includes('Luu Duc Dat'));
    assert.ok(bodyText.includes('Luu Duc Dat'));
    assert.ok(bodyText.includes('2004'));
    assert.ok(bodyText.includes('tkqb0ducdat@gmail.com'));
    assert.ok(bodyText.includes('0832 098 415'));
    assert.ok(bodyText.includes('PTIT HCMC'));
    assert.ok(bodyText.includes('3.1/4.0'));
    assert.ok(bodyText.includes('TOEIC 515'));
    assert.ok(bodyText.includes('N5'));
    assert.ok(bodyText.includes('Academic Excellence Award & Merit Scholarship'));
    assert.ok(bodyText.includes('Microservices-Based E-Commerce System'));
    assert.ok(bodyText.includes('Online Course Management RESTful API'));
    assert.ok(bodyText.includes('Driver Drowsiness Detection System'));
    assert.ok(bodyText.includes('Smart Home Security System with Pan-Tilt Camera'));
    assert.ok(HTML_CONTENT.includes('assets/img/avatar-dat.jpg'));

    const vietnameseTerms = ['khen thưởng', 'Cấp Trường', 'Học bổng', 'KKHT', 'QĐ'];
    for (const term of vietnameseTerms) {
      assert.equal(bodyText.includes(term), false, `Found Vietnamese term in index.html: ${term}`);
    }

    const embeddedDom = new JSDOM(EMBEDDED_CV_CONTENT, { url: 'http://localhost:3000/embedded-cv.html' });
    const embeddedText = (embeddedDom.window.document.body.textContent || '').replace(/\s+/g, ' ');
    assert.ok(embeddedText.includes('IoT / Embedded Firmware Developer'));
    assert.ok(embeddedText.includes('Year of Birth: 2004'));
    assert.ok(embeddedText.includes('3.1 / 4.0'));
    assert.ok(embeddedText.includes('University-Level Academic Excellence Award & Merit Scholarship'));
    assert.ok(embeddedText.includes('Smart Home Security System with Pan-Tilt Camera'));
    assert.ok(EMBEDDED_CV_CONTENT.includes('assets/img/avatar-dat.jpg'));

    for (const term of vietnameseTerms) {
      assert.equal(embeddedText.includes(term), false, `Found Vietnamese term in embedded-cv.html: ${term}`);
    }
  });

  it('contains zero leftover details or keys from reference portfolio', () => {
    const forbidden = [
      'Vo Nguyen Duy Long',
      'longnguyenduy.vo@gmail.com',
      '0937220747',
      'hnv26936lPefFjHev',
      'service_616ffea',
      'template_12gyiy8',
      'MOHCdlens',
      'First Gas',
      'OCBC Banking System',
      'DownloadCV()'
    ];
    for (const token of forbidden) {
      assert.equal(HTML_CONTENT.includes(token), false, `Found forbidden token: ${token}`);
      assert.equal(EMBEDDED_CV_CONTENT.includes(token), false, `Found forbidden token in embedded CV: ${token}`);
    }
  });

  it('has valid local assets for every img, link, script, PDF, and CSS url()', () => {
    for (const [pageName, content] of [
      ['index.html', HTML_CONTENT],
      ['embedded-cv.html', EMBEDDED_CV_CONTENT]
    ]) {
      const refs = [...content.matchAll(/(?:src|href)=["']([^"']+)["']/gi)].map((m) => m[1]);
      for (const ref of refs) {
        if (
          !ref ||
          ref.startsWith('#') ||
          ref.startsWith('http://') ||
          ref.startsWith('https://') ||
          ref.startsWith('mailto:') ||
          ref.startsWith('tel:')
        ) {
          continue;
        }
        const clean = ref.split('#')[0].split('?')[0];
        const fullPath = path.resolve(ROOT, clean);
        assert.equal(fs.existsSync(fullPath), true, `Missing asset in ${pageName}: ${ref}`);
        assert.ok(fs.statSync(fullPath).size > 0, `Empty asset in ${pageName}: ${ref}`);
      }
    }

    const cssUrls = [...CSS_CONTENT.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map((m) => m[1]);
    for (const url of cssUrls) {
      if (!url || url.startsWith('data:') || url.startsWith('http')) continue;
      const clean = url.split('#')[0].split('?')[0];
      const fullPath = path.resolve(ROOT, 'assets/css', clean);
      assert.equal(fs.existsSync(fullPath), true, `Missing CSS asset: ${url}`);
    }
  });

  it('enforces rel="noopener noreferrer" on all target="_blank" links and has no dead # links', () => {
    const externalLinks = [
      ...doc.querySelectorAll('a[target="_blank"]'),
      ...new JSDOM(EMBEDDED_CV_CONTENT).window.document.querySelectorAll('a[target="_blank"]')
    ];
    assert.ok(externalLinks.length > 0);
    for (const link of externalLinks) {
      const rel = (link.getAttribute('rel') || '').split(/\s+/);
      assert.ok(rel.includes('noopener'), `Missing noopener on ${link.getAttribute('href')}`);
      assert.ok(rel.includes('noreferrer'), `Missing noreferrer on ${link.getAttribute('href')}`);
    }

    const socialLinks = [...doc.querySelectorAll('.section-networks a')];
    for (const link of socialLinks) {
      assert.notEqual(link.getAttribute('href'), '#');
    }
  });

  it('connects all navbar links and project modal triggers to valid DOM elements', () => {
    const navAnchors = [...doc.querySelectorAll('.site-navigation .nav a[href^="#"]')];
    assert.equal(navAnchors.length, 7);
    for (const anchor of navAnchors) {
      const targetId = anchor.getAttribute('href').slice(1);
      assert.notEqual(doc.getElementById(targetId), null, `Missing section #${targetId}`);
    }

    const modalTriggers = [...doc.querySelectorAll('[data-toggle="modal"]')];
    assert.equal(modalTriggers.length, 6);
    for (const trigger of modalTriggers) {
      const target = trigger.getAttribute('data-target');
      assert.match(target, /^#portfolioItem\d+$/);
      assert.notEqual(doc.querySelector(target), null, `Missing modal ${target}`);
    }

    const cards = [...doc.querySelectorAll('#grid [data-groups]')];
    expectValidCards(cards, 6);
  });

  it('does not contain the template CSS typos', () => {
    assert.equal(CSS_CONTENT.includes('disply:'), false);
    assert.equal(CSS_CONTENT.includes('.acitve'), false);
  });
});

function expectValidCards(cards, expectedCount) {
  assert.equal(cards.length, expectedCount);
  for (const card of cards) {
    const parsed = JSON.parse(card.getAttribute('data-groups'));
    assert.equal(Array.isArray(parsed), true);
    assert.ok(parsed.length > 0);
  }
}

describe('Portfolio Interactive Behavior', () => {
  let dom;
  let win;
  let doc;

  beforeEach(() => {
    dom = new JSDOM(HTML_CONTENT, { url: 'http://localhost:3000/' });
    win = dom.window;
    doc = win.document;
  });

  it('validates email formats accurately', () => {
    assert.equal(PortfolioApp.isValidEmail('recruiter@company.com'), true);
    assert.equal(PortfolioApp.isValidEmail('  dev.name+1@sub.domain.vn  '), true);
    assert.equal(PortfolioApp.isValidEmail('invalid-email'), false);
    assert.equal(PortfolioApp.isValidEmail('a@b'), false);
    assert.equal(PortfolioApp.isValidEmail(''), false);
  });

  it('validates contact payload and builds mailto URL', () => {
    const missingName = PortfolioApp.validateContactPayload({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    assert.equal(missingName.ok, false);
    assert.equal(missingName.field, 'name');

    const badEmail = PortfolioApp.validateContactPayload({
      name: 'An',
      email: 'bad',
      subject: 'Hi',
      message: 'Test'
    });
    assert.equal(badEmail.ok, false);
    assert.equal(badEmail.field, 'email');

    const valid = PortfolioApp.validateContactPayload({
      name: 'HR Team',
      email: 'hr@example.com',
      subject: 'Embedded / Backend Interview',
      message: 'Let us schedule a call.'
    });
    assert.equal(valid.ok, true);

    const url = PortfolioApp.buildMailtoUrl('tkqb0ducdat@gmail.com', valid.data);
    assert.ok(url.includes('mailto:tkqb0ducdat@gmail.com?subject='));
    assert.ok(url.includes('Embedded%20%2F%20Backend%20Interview'));
    assert.ok(url.includes('HR%20Team'));
  });

  it('handles contact form submit validation and reset in JSDOM', () => {
    const fakeWin = {
      innerHeight: 800,
      location: { href: '' },
      addEventListener: () => {}
    };
    PortfolioApp.initContactForm(doc, fakeWin);

    const form = doc.getElementById('contact-form');
    const status = doc.getElementById('contact-status');

    form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
    assert.ok(status.textContent.includes('Please input your name'));
    assert.ok(status.className.includes('contact-status--error'));

    doc.getElementById('name').value = 'Nguyen Van A';
    doc.getElementById('email').value = 'a@example.com';
    doc.getElementById('subject').value = 'IoT / Backend Role';
    doc.getElementById('message').value = 'Would love to connect.';

    form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
    assert.ok(status.className.includes('contact-status--success'));
    assert.ok(fakeWin.location.href.includes('mailto:tkqb0ducdat@gmail.com'));
    assert.equal(doc.getElementById('name').value, '');
    assert.equal(doc.getElementById('btnSendMessage').disabled, false);
  });

  it('filters project cards cleanly by technology group', () => {
    PortfolioApp.filterProjectsDom(doc, 'embedded');
    const items = [...doc.querySelectorAll('#grid [data-groups]')];
    const visible = items.filter((el) => el.getAttribute('data-filtered-visible') === 'true');
    assert.equal(visible.length, 2);
    assert.ok(visible.some((el) => el.textContent.includes('Driver Drowsiness Detection')));
    assert.ok(visible.some((el) => el.textContent.includes('Smart Home Pan-Tilt Security')));

    PortfolioApp.filterProjectsDom(doc, 'java');
    const javaVisible = items.filter((el) => el.getAttribute('data-filtered-visible') === 'true');
    assert.equal(javaVisible.length, 3);

    PortfolioApp.filterProjectsDom(doc, 'all');
    const allVisible = items.filter((el) => el.getAttribute('data-filtered-visible') === 'true');
    assert.equal(allVisible.length, 6);
  });

  it('animates hero typing text and activates visible reveal elements', (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const stop = PortfolioApp.initTypingEffect(doc, ['Java Dev', 'Embedded Dev']);
    const el = doc.querySelector('.auto-input');
    assert.equal(el.textContent, 'Java Dev');

    t.mock.timers.tick(1900);
    assert.ok(el.textContent.length < 'Java Dev'.length);
    if (stop) stop();
    t.mock.timers.reset();

    const firstReveal = doc.querySelector('.reveal');
    firstReveal.getBoundingClientRect = () => ({ top: 100 });
    PortfolioApp.revealVisibleElements(win, doc);
    assert.equal(firstReveal.classList.contains('active'), true);
  });
});

describe('Static Server & CI/CD Configuration', () => {
  it('serves index.html, embedded-cv.html, and resume PDF and blocks path traversal', async () => {
    const homeRes = await invokeStaticRequest('/', ROOT);
    assert.equal(homeRes.status, 200);
    assert.ok(homeRes.headers['Content-Type'].includes('text/html'));
    assert.ok(homeRes.body.toString('utf8').includes('Luu Duc Dat'));

    const embeddedRes = await invokeStaticRequest('/embedded-cv.html', ROOT);
    assert.equal(embeddedRes.status, 200);
    assert.ok(embeddedRes.headers['Content-Type'].includes('text/html'));
    assert.ok(embeddedRes.body.toString('utf8').includes('IoT / Embedded Firmware Developer'));

    const pdfRes = await invokeStaticRequest('/assets/resume/cv-of-LuuDucDat.pdf', ROOT);
    assert.equal(pdfRes.status, 200);
    assert.ok(pdfRes.headers['Content-Type'].includes('application/pdf'));
    assert.ok(pdfRes.body.length > 1000);

    const missingRes = await invokeStaticRequest('/does-not-exist.html', ROOT);
    assert.equal(missingRes.status, 404);

    const traversalRes = await invokeStaticRequest('/%2e%2e/%2e%2e/package.json', ROOT);
    assert.equal(traversalRes.status, 403);

    const hiddenRes = await invokeStaticRequest('/.git/config', ROOT);
    assert.equal(hiddenRes.status, 403);
  });

  it('includes GitHub Actions and GitLab CI/CD workflows', () => {
    const ghWorkflow = fs.readFileSync(path.join(ROOT, '.github/workflows/ci-cd.yml'), 'utf8');
    assert.ok(ghWorkflow.includes('npm run lint'));
    assert.ok(ghWorkflow.includes('npm test'));
    assert.ok(ghWorkflow.includes('npm run build'));
    assert.ok(ghWorkflow.includes('actions/deploy-pages'));

    const gitlabCi = fs.readFileSync(path.join(ROOT, '.gitlab-ci.yml'), 'utf8');
    assert.ok(gitlabCi.includes('npm run lint'));
    assert.ok(gitlabCi.includes('npm test'));
    assert.ok(gitlabCi.includes('npm run build'));
    assert.ok(gitlabCi.includes('pages:'));
    assert.ok(gitlabCi.includes('public'));
  });
});
