import { AgentRecipient } from './agent-recipient.model';
import { AgentSender } from './agent-sender.model';
import { AgentTransport } from './agent-transport.model';
import { Package } from '../package.model';

export class AgentFormModel {
  creator: string;
  awb: string;
  instructions: string;
  createdDate: Date;
  sender: AgentSender;
  recipient: AgentRecipient;
  transport: AgentTransport;
  packagesList: Package[];
}
