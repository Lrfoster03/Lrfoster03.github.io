---
layout: post
title:  "Feature Flags"
date:   2026-05-23 00:00:00 -0700
author: "Logan Foster"
categories: Projects
image: /assets/images/featureflags/ffsite.png
permalink: /feature-flags
---

I would like to talk about a project I have been working on for the past few months. It is a config serving service that I have been developing for my own use. The idea behind it is to allow me to easily enable quick changes to configs without needing to redeploy my entire website.

<img title="Screenshot of my FeatureFlag / Config project" alt="Screenshot of my FeatureFlag / Config project" src="/assets/images/featureflags/ffsite.png">

Initially it started as a simple idea to understand deterministic bucketing for feature flags, however I expanded it to become a more general config serving service. I have been using it to manage some of the configs for my website, and it has been working well so far. I have also been using it to manage some of the configs for my other projects, and it has been working well for those as well.

One such config has been my Reading List page.

<img title="Screenshot of the reading list config" alt="Screenshot of the reading list config" src="/assets/images/featureflags/ffConfig.png">

<img title="Screenshot of the reading progress" alt="Screenshot of the reading progress" src="/assets/images/featureflags/projectSite.png">

I like to catalog the books I have read, and I wanted a way to easily manage the list of books on my website. This config service allows me to easily add and remove books from the list without needing to redeploy my website. It also allows me to track my progress on each book, which is a nice bonus.

You should go ahead and give the site a try at [https://featureflags.logoas.xyz/](https://featureflags.logoas.xyz/) if you are interested in using it for your own projects, or if you just want to see how it works. I have also open sourced the code on GitHub at [https://github.com/Lrfoster03/featureflags](https://github.com/Lrfoster03/featureflags).

You can trial the service using the following curl request:

```bash
curl --location 'https://featureflags.logoas.xyz/api/featureflags' \
--header 'user: <your-user>' \
--header 'X-API-Key: <your-api-key>'
```

This will return a JSON object with the current feature flags and configs for the user. You can then use this information to enable or disable features in your own projects.