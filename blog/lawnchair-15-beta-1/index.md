---
title: "Lawnchair 15 Beta 1 is here!"
description: "This foundational release brings App Drawer Folders, an Android 15 rebase, and much more."
authors:
  - generic
first_published: 2025-07-14
---

Yes, that's right. After months of hard work, we're thrilled to release **Lawnchair 15 Beta 1**! You can download it today from our [GitHub Releases page](https://github.com/LawnchairLauncher/lawnchair/releases/tag/v15.0.0-beta1).

This is a foundational release, bringing Lawnchair up to date with Android 15 and introducing some of our most requested features ever.

## A Note on this beta

While this is a Beta release and stable enough for general use, you may still encounter some issues. We've documented the major known regressions (like Icon Badges) in the full changelog. If you see something wrong, please report it on our [GitHub](https://github.com/LawnchairLauncher/lawnchair/issues).

## Highlights

### Your app drawer, organized your way

This is the big one. We've finally added **App Drawer Folders**! You now have two powerful ways to organize your apps:

- **Manual Folders:** Create your own folders, name them whatever you want, and reorder them to create the perfect layout.
- **Caddy (Experimental):** For those who want a bit of magic, you can enable Caddy to automatically categorize your entire app drawer for you.

<details>
  <summary style="font-weight: 600; cursor: pointer;">
    Watch a video of App Drawer Folders in action
  </summary>
  <figure id="drawer-video">
    <video width="320" height="723"
    controls
    playsinline
    controlsList="nofullscreen noremoteplayback"
    muted>
      <source src="/images/blog-15-beta/app-drawer-folder-example.webm" type="video/webm" />
      <source src="/images/blog-15-beta/app-drawer-folder-example.mp4" type="video/mp4"  />
      A video of a user showcasing the features of app drawer folders - creating, re-organizing, and adding apps to one.
    </video>
    <figcaption>Example video of app drawer folder customization</figcaption>
  </figure>
</details>

### Android 15 and a Modern Core

A huge amount of effort went into rebasing Lawnchair on Launcher3 from Android 15. This brings a more stable, secure, and performant foundation to the launcher. It also means we're ready for core Android 15 features like Private Space and App Archiving.

### A More Powerful Dock

The dock gets a major upgrade in this release. You can now:

- Add a background color and adjust its corner radius.
- Place widgets directly in the dock alongside your app icons.
- Enable icon labels for apps in the dock.

<figure>
  <picture>
    <source type="image/webp" srcset="/images/blog-15-beta/dock-customization-example.webp" />
    <img
      src="/images/blog-15-beta/dock-customization-example.jpg"
      alt="The dock with a custom green background, a widget, and a custom search bar."
      height="198" width="320"
      loading="lazy" />
  </picture>
  <figcaption>Example image of dock customization</figcaption>
</figure>

### Expanded Search Options

Search is now more flexible than ever. We've added support for custom web search engines in the app drawer, and added a host of new built-in providers, including Ecosia, Kagi, Firefox, and more.

## The Road Ahead

We're not stopping here. Now that the A15 rebase is complete, our next priorities will be tackling the known regressions (getting Icon Badges working again is at the top of the list, alongside other bugs relating to app drawer folders) and working through the feature requests that our new Triage Team is helping to organize.

## Thanks

This release was a massive effort, and it wouldn't be possible without the whole community.

First, a huge thank you to our new **Lawnchair Triage Team**. In just a few days, this group of volunteers has already started to make a massive difference in helping us manage feedback. Their work is fundamentally changing how quickly we can develop.

And as always, thanks to our core team members (TheSuperDragon, Yasan, MrSluffy, and Goooler), all our code contributors, our translators on Crowdin, and everyone who supports us on Open Collective.

We can't wait to hear what you think of Lawnchair 15!

Published by the Lawnchair Team on July 14, 2025 | 14:00 UTC
