export abstract class System {
  abstract readonly name: string
  abstract msg(action: string, ...payload: any): void
}

type SystemName = 'audio' | 'usecom'

const systems: { [name: string]: System } = {}

export function send(system: SystemName, message: string, ...payload): any {
  if (system in systems) return systems[system].msg(message, ...payload)
}

export function register(system: System) {
  systems[system.name] = system
}
