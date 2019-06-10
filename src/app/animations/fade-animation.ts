import { trigger, style, transition, animate, state, keyframes } from '@angular/animations';

export const fadeAnimation =
  trigger('fadeAnimation', [
    // state('in', style({ opacity: 0 })),
    // transition('void => *', [
    //   animate(400, keyframes([
    //     style({ opacity: 0 }),
    //     style({ opacity: 1 })
    //   ]))
    // ]),
    // transition('* => void', [
    //   animate(400, keyframes([
    //     style({ opacity: 0 }),
    //     style({ opacity: 1 })
    //   ]))
    // ])
  ])
