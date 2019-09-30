export abstract class System {
  abstract readonly name: string
  abstract msg(action: string, ...payload: any): void
}

type SystemName = 'audio'

const systems: { [name: string]: System } = {}

export function send(system: SystemName, message: string, ...payload) {
  if (system in systems) systems[system].msg(message, ...payload)
}

export function register(system: System) {
  systems[system.name] = system
}
