import { trigger, style, transition, animate, query } from '@angular/animations';

export const appAnimation =
  trigger('appAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'translateY(1%)'
        })
      ], { optional: true }),
      query(':enter', [
        animate('450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]);
