class TweetSerializer < ActiveModel::Serializer
  attributes :id, :text, :user
end
