import { TransportDetails } from './transport.model';
import { Truck } from '../truck.model';
import { CompanySender } from './company-sender.model';

export class CompanyFormModel {
  awb: string;
  createdDate: Date;
  instructions: string;
  sender: CompanySender;
  transportDetails: TransportDetails;
  trucks: Truck[];
}
