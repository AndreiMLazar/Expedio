import { Recipient } from './recipient.model';
import { LoadingPlace } from './loading-place.model';
import { Deposit } from './deposit.model';
import { Package } from './package.model';

export class ClientFormModel {
  fullName: string;
  address: string;
  country: string;
  instructions: string;
  recipient: Recipient;
  loadingPlace: LoadingPlace;
  deposit: Deposit;
  packagesList: Package[];
}
