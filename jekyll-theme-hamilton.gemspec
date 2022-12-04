# frozen_string_literal: true

require "./lib/jekyll_auth/version"

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-hamilton"
  spec.version       = "4.0.0"
  spec.authors       = ["Shangzhi Huang"]
  spec.email         = ["ngzhio@gmail.com"]

  spec.summary       = "A minimal and beautiful Jekyll theme best for writing and note-taking."
  spec.homepage      = "https://github.com/ngzhio/jekyll-theme-hamilton"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.9"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.13"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "kramdown-parser-gfm", "~> 1.1"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 12.0"
  require "./lib/jekyll_auth/version"

  # spec.name                  = "jekyll-auth"
  # spec.version               = JekyllAuth::VERSION
  # spec.summary               = "A simple way to use GitHub OAuth to serve a protected jekyll site to your GitHub organization"
  # spec.description           = "A simple way to use GitHub OAuth to serve a protected jekyll site to your GitHub organization."
  # spec.authors               = "Ben Balter"
  # spec.email                 = "ben@balter.com"
  # spec.homepage              = "https://github.com/benbalter/jekyll-auth"
  # spec.license               = "MIT"
  # spec.files                 = `git ls-files`.split("\n")
  # spec.test_files            = `git ls-files -- {test,spec,features}/*`.split("\n")
  # spec.executables           = `git ls-files -- bin/*`.split("\n").map { |f| File.basename(f) }
  # spec.require_paths         = ["lib"]

  # spec.add_runtime_dependency "activesupport", ">= 5", "< 8"
  # spec.add_runtime_dependency "colorator", "~> 1.0"
  # spec.add_runtime_dependency "dotenv", "~> 2.0"
  # spec.add_runtime_dependency "mercenary", "~> 0.3"
  # spec.add_runtime_dependency "rack", ">= 1.6", "< 3.0"
  # spec.add_runtime_dependency "rack-protection", ">= 1.5.5", "< 3.0"
  # spec.add_runtime_dependency "rack-ssl-enforcer", "~> 0.2"

  # spec.add_dependency "safe_yaml", "~> 1.0"
  # spec.add_dependency "sinatra-index", "~> 0.0"
  # spec.add_dependency "sinatra_auth_github", ">= 1.1", "< 3.0"
  # spec.add_development_dependency "pry", "~> 0.10"
  # spec.add_development_dependency "rack-test", "~> 2.0"
  # spec.add_development_dependency "rspec", "~> 3.1"
  # spec.add_development_dependency "rubocop", "~> 0.49", ">= 0.49.0"
  # spec.add_development_dependency "rubocop-jekyll", "~> 0.11.0"
  # spec.add_development_dependency "rubocop-performance", "~> 1.0"
  # spec.add_development_dependency "webmock", "~> 2.3 "

end
