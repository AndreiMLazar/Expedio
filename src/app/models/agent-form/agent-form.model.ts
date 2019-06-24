import { Recipient } from './agent-recipient.model';
import { Package } from '../package.model';
import { AgentSender } from './agent-sender.model';

export class AgentFormModel {
  awb: string;
  instructions: string;
  createdDate: Date;
  sender: AgentSender;
  recipient: Recipient;
  packagesList: Package[];
}
