import { useEffect, useRef, useState } from 'react'

const ROLES = [
  'Java Backend Developer',
  'Spring Boot Engineer',
  'System Architecture Enthusiast',
]

type Phase = 'typing' | 'deleting' | 'pausing'

interface TypingState {
  displayText: string
  phase: Phase
}

const TYPE_SPEED = 75
const DELETE_SPEED = 38
const PAUSE_AFTER_TYPE = 1800
const PAUSE_AFTER_DELETE = 400

export function useTypingEffect(): TypingState {
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const roleIndex = useRef(0)
  const charIndex = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function tick() {
      const currentRole = ROLES[roleIndex.current]

      if (phase === 'typing') {
        if (charIndex.current < currentRole.length) {
          charIndex.current++
          setDisplayText(currentRole.slice(0, charIndex.current))
          timerRef.current = setTimeout(tick, TYPE_SPEED)
        } else {
          setPhase('pausing')
          timerRef.current = setTimeout(() => {
            setPhase('deleting')
          }, PAUSE_AFTER_TYPE)
        }
      } else if (phase === 'deleting') {
        if (charIndex.current > 0) {
          charIndex.current--
          setDisplayText(currentRole.slice(0, charIndex.current))
          timerRef.current = setTimeout(tick, DELETE_SPEED)
        } else {
          roleIndex.current = (roleIndex.current + 1) % ROLES.length
          setPhase('pausing')
          timerRef.current = setTimeout(() => {
            setPhase('typing')
          }, PAUSE_AFTER_DELETE)
        }
      }
    }

    timerRef.current = setTimeout(tick, phase === 'typing' && charIndex.current === 0 ? 600 : 0)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [phase])

  return { displayText, phase }
}
