# _plugins/env_loader.rb
require "dotenv"
Dotenv.load

Jekyll::Hooks.register :site, :after_init do |site|
  site.config['env'] = {
    'STATSIG_CLIENT_SDK_KEY' => ENV['STATSIG_CLIENT_SDK_KEY']
  }
end