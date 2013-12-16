class Api::V1::TweetsController < ApplicationController

  def index

    # Open a twitter client
    client = open_client(current_user.id)

    @tweets = client.home_timeline

    # returning an <Array>
    render json: @tweets, root: false
  end


  def create

    client = open_client(params['user_id'])

    case params['twitter_action']
    when 'new'
      # Send new tweet
      @tweet = client.update(params['tweet'])

    when 'retweet'
      # Send retweet
      @tweet = client.retweet(params['tweet_id'])

    when 'favorite'
      # Send favorite
      @tweet = client.favorite(params['tweet_id'])

    render json: @tweet
    end
  end


  private
  def open_client(user_id)
  # Configure our twitter client for making requests
    user = User.find_by_id(user_id)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token        = user.token
      config.access_token_secret = user.token_secret
    end
    return client
  end

end
