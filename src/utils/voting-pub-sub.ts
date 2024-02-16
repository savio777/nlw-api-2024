type IMessageSubscriberParams = {
  pollOpionId: string;
  votes: number;
  title: string;
};

type ISubscriber = (params: IMessageSubscriberParams) => void;

class VotingPubSub {
  private channels: Record<string, ISubscriber[]> = {};

  subscribe(pollId: string, subscriber: ISubscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    this.channels[pollId].push(subscriber);
  }

  publish(pollId: string, message: IMessageSubscriberParams) {
    if (!this.channels[pollId]) {
      return;
    }

    this.channels[pollId].forEach((subscriber) => {
      subscriber(message);
    });
  }
}

export const voting = new VotingPubSub();
