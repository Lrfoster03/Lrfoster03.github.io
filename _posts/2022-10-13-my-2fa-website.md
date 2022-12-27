---
layout: post
title:  "My 2FA Project"
date:   2022-10-13 00:00:33 -0700
author: "Logan Foster"
categories: Projects
permalink: /my-2fa-project
---

For my CPT_S 327 Cybersecurity course, I decided to base my final project on a 2FA service for this very website you're using now. The intial plan was for me to create a site on my own, however upon looking into some further options, I decided that it would be better to utilize the GitHub API and GitHub's very own OAuth 2FA service. This way, I could use GitHub pages to host my site (Like I am doing now), whilst using GitHub's OAuth service to authenticate users.

I begun by creating the site using the Jekyll Static site generator. I then created a GitHub repository for the site, and pushed the site to the repository. Then I could get started on the 2FA part of it. I used the [Jekyll-Auth][jekyll-auth] dependency for the majority of the project. I did hit quite a few snags with the page though that I will talk about more in depth below. 

Using Jekyll-Auth, one snag I hit was how the site worked with Encryption. When I hosted the site through GitHub pages like I am now, the encryption wouldn't work. When I hosted it through Heroku like the page initially required, then it would work. I was able to get it to work by using the `bundle exec jekyll-auth serve` command. This command would allow me to host the site locally, and then use the GitHub OAuth service to authenticate users. 

I then created a GitHub organization to act as a whitelist to authenticate users. With this, I didn't need to keep track of users cridentials myself, and I could just use the GitHub API to check if a user was a member of the organization. This was a much better solution and made the project much easier to manage. 

Then, all I had to do was push the site to Heroku and it was done. Upon testing with a few of my friends, I found that the site worked perfectly. I was able to authenticate users, and then redirect them to the site. I could add new users to the organization and they would be able to authenticate themselves. I was able to remove users from the organization and they would no longer be able to authenticate themselves. 

Unfortunately, due to Heroku being a paid service, I had to take the site down. 

If you want to try out the Jekyll-Auth service, you can find the GitHub repository [here][jekyll-auth]. Even though it has reached end of life, it still works perfectly and I highly recommend it.



[jekyll-auth]: https://github.com/benbalter/jekyll-auth