require "json"
require "securerandom"

class App < Padrino::Application

  register Padrino::Helpers

  RESULT_OK = {
    :result => "OK",
  }.to_json

  get "/some/api" do
    RESULT_OK
  end

  post "/some/api" do
    RESULT_OK
  end

  get "/some/api/with/custom/header" do
    headers "X-Hello" => "WORLD"
    RESULT_OK
  end

  post "/some/api/with/custom/header" do
    headers "X-Hello" => "WORLD"
    RESULT_OK
  end

  get "/some/api/with/random/header" do
    headers "X-Hello" => SecureRandom.uuid
    RESULT_OK
  end

  post "/some/api/with/random/header" do
    headers "X-Hello" => SecureRandom.uuid
    RESULT_OK
  end

  get "/js/hello.js" do
    "console.log('hello');"
  end

end
