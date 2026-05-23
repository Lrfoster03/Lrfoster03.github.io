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

