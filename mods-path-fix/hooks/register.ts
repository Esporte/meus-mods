import type { EngineInterface, Register } from 'claude-code'

// On Windows a mod's $.process.run(['claude', ...]) fails with
// "Command 'claude' not found", even with claude.exe on PATH. This mod
// rewrites a bare `claude` to the full path of claude.exe, for any mod's call.

// The module's own cache: undefined = not looked yet, null = not found.
let found: string | null | undefined

async function exists($: EngineInterface, path: string) {
  return $.fs.stat(path).then(() => true, () => false)
}

async function findClaude($: EngineInterface): Promise<string | null> {
  if (found !== undefined) {
    return found
  }
  const candidates: string[] = []
  const own = await $.env.get('CLAUDE_CODE_EXECPATH').catch(() => undefined)
  if (own) {
    candidates.push(own)
  }
  const appData = await $.env.get('APPDATA').catch(() => undefined)
  if (appData) {
    candidates.push(`${appData}\\npm\\claude.exe`)
  }
  const profile = (await $.env.get('USERPROFILE').catch(() => undefined)) ?? (await $.env.get('HOME').catch(() => undefined))
  if (profile) {
    candidates.push(`${profile}\\.local\\bin\\claude.exe`, `${profile}\\AppData\\Roaming\\npm\\claude.exe`)
  }
  for (const path of candidates) {
    if (await exists($, path)) {
      found = path
      return found
    }
  }
  // Last resort: ask Windows where claude.exe is on PATH.
  const root = (await $.env.get('SystemRoot').catch(() => undefined)) ?? 'C:\\Windows'
  const where = await $.process
    .run([`${root}\\System32\\where.exe`, 'claude.exe'], { timeoutMs: 5000 })
    .catch(() => undefined)
  const first = where?.exitCode === 0 ? where.stdout.split(/\r?\n/)[0]?.trim() : undefined
  found = first ? first : null
  return found
}

export const register: Register = (on) => {
  on('process.run', async ($, e, next) => {
    const cmd = e.argv[0]
    if (cmd !== 'claude' && cmd !== 'claude.exe') {
      return next(e)
    }
    const path = await findClaude($).catch(() => null)
    return next(path ? { ...e, argv: [path, ...e.argv.slice(1)] } : e)
  })
}
