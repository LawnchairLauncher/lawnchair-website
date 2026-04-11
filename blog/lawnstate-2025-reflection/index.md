---
title: "Lawnstate: 2025 Year End Reflection"
description: "Let's talk about the year's progress and a sneak peek on Lawnchair 16."
authors:
  - TheSuperDragon
first_published: 2025-12-30
---

Welcome back to Lawnstate! Happy holidays and advance happy new year as well from the team!

It's been a while since the last post, so we've got a lot to cover. We'll look at what we've accomplished and then take a peek at what's coming next.

## Looking back on the years' achievements

This year was really about laying the groundwork for the future. We started things off with the release of Lawnchair 15 Beta 1, an important step in modernizing our codebase. The feedback from that release then directly lead us to the work that led to release we had a few days ago: **[Lawnchair 15 Beta 2](https://github.com/LawnchairLauncher/lawnchair/releases/tag/v15.0.0-beta2)**.

This new beta is a stability-focused update. It's packed with bug fixes that address a lot of the common issues from Beta 1, while improving under-the-hood functionality to make things more stable and extensible. The goal is to provide a much more solid foundation for everyone.

## A sneak peek on Lawnchair 16

While we've been polishing Lawnchair 15, a massive effort has been happening in the background on the `16-dev` branch. Thanks to our new contributor and now core team member, [@nullcube](https://github.com/validcube), we've completed the initial rebase of Lawnchair onto both the Android 16 *and* the QPR1 codebase. In other words, we're now working on **Lawnchair 16**!

This is a huge, complex job. For those that are tech-savvy, this is basically similar to upgrading an out-of-date Linux installation with the newest versions. For those that aren't, let's just say that, we replace the older, slightly dusty car engine with the very latest from the manufacturer (aka AOSP).

This also allows us to actually implement proper foldable and tablet support in the launcher!

Now, pictures describe a lot more than words, so below is a gallery describing some of the upcoming features of Lawnchair 16:

<figure class="gallery">
  <ul>
    <li>
      <picture>
        <source type="image/webp" srcset="/images/blog-2025-reflection/lawnchair-16-phone.webp">
        <img src="/images/blog-2025-reflection/lawnchair-16-phone.webp" alt="Phone screenshot" height="auto" width="1080" loading="lazy">
      </picture>
    </li>
    <li>
      <picture>
        <source type="image/webp" srcset="/images/blog-2025-reflection/lawnchair-16-foldable.webp">
        <img src="/images/blog-2025-reflection/lawnchair-16-foldable.png" alt="Foldable screenshot" height="auto" width="1080" loading="lazy">
      </picture>
    </li>
    <li>
      <picture>
        <source type="image/webp" srcset="/images/blog-2025-reflection/lawnchair-16-tablet.webp">
        <img src="/images/blog-2025-reflection/lawnchair-16-tablet.png" alt="Tablet screenshot" height="auto" width="1080" loading="lazy">
      </picture>
    </li>
    <li>
      <picture>
        <source type="image/webp" srcset="/images/blog-2025-reflection/lawnchair-16-phone-appdrawer.webp">
        <img src="/images/blog-2025-reflection/lawnchair-16-phone-appdrawer.png" alt="Phone app drawer screenshot" height="auto" width="1080" loading="lazy">
      </picture>
    </li>
    <li>
      <picture>
        <source type="image/webp" srcset="/images/blog-2025-reflection/lawnchair-16-phone-settings.webp">
        <img src="/images/blog-2025-reflection/lawnchair-16-phone-settings.png" alt="Phone settings screenshot" height="auto" width="1080" loading="lazy">
      </picture>
    </li>
    <li>
      <picture>
        <source type="image/webp" srcset="/images/blog-2025-reflection/lawnchair-16-foldable-settings.webp">
        <img src="/images/blog-2025-reflection/lawnchair-16-foldable-settings.png" alt="Foldable settings screenshot" height="auto" width="1080" loading="lazy">
      </picture>
    </li>
  </ul>
  <figcaption>Spoilers for the new look of Lawnchair! We won't showcase too much, though!</figcaption>
</figure>

If you're brave enough to test, you can download these builds right now from the GitHub Actions tab on our repository. As stated before, this is a completely new foundation and things there can become *very unstable*, so test at your own discretion.

## Across the ecosystem

Now, Lawnchair doesn't exist in a vacuum. We have other related projects that have seen excellent progress.

### Lawnicons

Thanks to [@x9136](https://github.com/x9136)'s work and community contributions, we were able to increase the icon count from 6700 icons to **7581 icons** in the latest release! That's a *lot* of icons over a span of around five months.

Alongside that, we are now launching a beta version of the new **Lawnicons request dashboard!** This will make things significantly easier for contributors to view the list of unthemed icons and help grow the icon pack even faster.

<a href="/lawnicons-dashboard">
  <figure>
    <picture>
      <source type="image/webp" srcset="/images/blog-2025-reflection/lawnicons-request-dashboard.webp">
      <img src="/images/blog-2025-reflection/lawnicons-request-dashboard.png" alt="Screenshot of the Lawnicons request dashboard" height="auto" width="1080" loading="lazy">
    </picture>
    <figcaption>The Lawnicons requests dashboard! Click the image to check it out!</figcaption>
  </figure>
</a>

### Social media

Yes, that's right. We plan on being more active again on our social media. Starting next year, we plan to be more active on our X (Twitter) and our newly created Mastodon account! Go give us a follow if you haven't already.

<ul class="fancy-links">
  <li>
    <a class="fancy-link twitter" href="https://x.com/lawnchairapp">
      <img class="dark-invert" src="/images/x.svg" alt="" height="50" >
      <span>Follow us on X</span></a>
  </li>
  <li>
    <a class="fancy-link mastodon" href="https://mastodon.social/@lawnchairapp">
      <img class="dark-invert" src="/images/mastodon.svg" alt="" height="50" >
      <span>Follow us on Mastodon</span></a>
  </li>
</ul>

### Regarding support

Now, we are well aware that support regarding certain issues in the launcher can be a bit... *inconsistent*, to say the least. As such, we're taking a few steps to professionalize the project and make this better:

- If you haven't noticed in the navigation bar above, we now have [a support page](/support) to centralize support requests!
- Regarding [the FAQ](/faq), we will slowly update its contents and add a few QoL features to improve its usability.
- We are also re-evaluating the effectiveness of our triage team to manage the huge number of issues and discussions on GitHub.

This is one of the few steps we are taking to professionalize the project. Stay tuned over at our social media to find out more!

### Thank you to everyone!

As always, a huge thank you to everyone, including:

- our [code contributors at GitHub](https://github.com/LawnchairLauncher/lawnchair) who implemented new features and fixed bugs;
- our [translators at Crowdin](https://lawnchair.crowdin.com/) who helped make Lawnchair more accessible to everyone, and;
- our [donors at Open Collective](https://opencollective.com/lawnchair) who directly help us fund hardware investments and contributor grants.

Even simply sharing your home screen setups and spreading word about Lawnchair helps make our community grow!

Once again, advance Happy New Year from the Lawnchair team!
