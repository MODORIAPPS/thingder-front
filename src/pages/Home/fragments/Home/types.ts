export type Direction = 'left' | 'right' | 'up' | 'down'

export interface API {
    swipe(dir?: Direction): Promise<void>
    restoreCard(): Promise<void>
}