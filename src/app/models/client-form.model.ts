import { Recipient } from './recipient.model';
import { LoadingPlace } from './loading-place.model';
import { Deposit } from './deposit.model';
import { Package } from './package.model';
import { Sender } from './sender.model';

export class ClientFormModel {
  awb: string;
  sender: Sender;
  recipient: Recipient;
  loadingPlace: LoadingPlace;
  deposit: Deposit;
  packagesList: Package[];
}
