import {
  trigger,
  transition,
  style,
  query,
  animate
} from '@angular/animations';

export const dashboardAnimation =
  trigger('dashboardAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: -30,
          width: '99%',
          opacity: 0,
        })
      ], { optional: true }),
      query(':enter', [
        animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({
            opacity: 1,
            left: 0,
            width: '100%'
          })
        )
      ], { optional: true })
    ])
  ]);
