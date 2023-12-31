import React, { Component } from 'react';
import Layout from 'components/Layout';
import Section from 'components/Section';
import FeedbackOptions from 'components/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import Notification from 'components/Notification';


export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countLeaveFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;

    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;

    return this.countTotalFeedback()
      ? Math.round((good / this.countTotalFeedback()) * 100)
      : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);

    return (
      <Layout>
        <Section title='Please leave feedback'>
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.countLeaveFeedback}
          >
          </FeedbackOptions>
        </Section>
        <Section title='Statistics'>
          {!this.countTotalFeedback()
            ? (<Notification message='There is no feedback!' />)
            : (
              <Statistics good={good}
                          neutral={neutral}
                          bad={bad}
                          total={this.countTotalFeedback()}
                          positivePercentage={this.countPositiveFeedbackPercentage()} />
            )}
        </Section>
      </Layout>
    );
  }
}

