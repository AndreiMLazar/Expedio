import { Recipient } from './client-recipient.model';
import { LoadingPlace } from './loading-place.model';
import { Deposit } from './deposit.model';
import { Package } from '../package.model';
import { ClientSender } from './client-sender.model';

export class ClientFormModel {
  awb: string;
  createdDate: Date;
  sender: ClientSender;
  recipient: Recipient;
  loadingPlace: LoadingPlace;
  deposit: Deposit;
  packagesList: Package[];
}
