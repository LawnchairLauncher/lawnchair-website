---
title: "Lawnchair 14 is here!"
description: "This blog highlights the major new features in Lawnchair 14."
authors:
	- generic
first_published: 2024-04-03
---

(Maybe a clever tagline is needed.)

Yes, that's right. We have released a beta version of **Lawnchair 14** today; download on [GitHub](https://github.com/LawnchairLauncher/lawnchair/releases), [Telegram](https://t.me/lawnchairci), or [Discord](https://discord.gg/3x8qNWxgGZ).

Now, you may be wondering: what’s new? Well, there are many new things in Lawnchair.

## A note on stability

While we have changed our stability status from Alpha to Beta, there are still some issues that may remain. We have indeed tested Lawnchair and it is stable enough for general use, but if you see something wrong, please report it on our [GitHub](https://github.com/LawnchairLauncher/lawnchair/issues).

Also note that Lawnchair 14 Beta 1 will install as a separate app from Lawnchair 12.1. However, you can easily export your old v12.1 settings via the "Create Backup" option in the Home Settings dropdown menu and import them in v14 via "Restore Backup".

## Highlights

### QuickSwitch support

All of us know that Lawnchair is one of the few launchers with QuickSwitch support. And yes, we still support it, but with a twist:

**Lawnchair now supports QuickSwitch on Android 10 to 14!**

That's right! If you're stuck on an older version of Android, you'll need not to use an older version of Lawnchair (i.e. Lawnchair 10 for Android 10) to have smooth gestures and a customizable recents screen

Note that while Lawnchair supports Android 13 and below, some features exclusive to Android 14 will not show up in these Android versions. A notable example is the taskbar, which will *not* show up on Android 12 and below.

### GestureNavContract

While rooted users can enjoy Lawnchair with QuickSwitch, this leaves the majority of users in the dust when it comes to Launcher-Recents animations.

Fortunately, Google made an API in Android 11 (named GestureNavContract) to have a stopgap in animations. You can read more about this in the [blog post on XDA]. While the API isn't perfect and there can be issues, it does the job well in preserving the smooth animations.

In short, Lawnchair 14 now supports these animations so you can have a smoother experience when using Lawnchair without root.

Note that some devices may not support this feature; if Lawnchair doesn't have these animations, it probably isn't supported by your device.

### Global Search

As you may already know, some OEMs like Samsung and Google allow you to search your phone’s contacts, settings, files, and more. However, these features are locked into their specific devices, making Global Search an exclusive feature.

With the new Lawnchair update, you don’t need any of those.

We now have Global Search! Search your phone’s contacts, files, settings, the web and more with this update. Note that we are planning to add additional search options in the future, including and API for creating custom search providers and a more Pixel-like UI for the search interface.

You may have noticed above that we are using Startpage as the default search engine. This leads us to the below point.

#### Startpage

Starpage is a private search engine that does not collect any data while still providing Google-like results. After much discussion internally, we’re happy to report that we now have a revenue-sharing agreement with them.

Here's the best part: Lawnchair does *not* share any data at all to them, and your private data is still safe. If you don't want Startpage, you can easily disable it within Home Settings > Drawer Search > Startpage Suggestions and Home Settings > Dock > Search Provider.

### Smartspacer support

[Smartspacer](https://github.com/KieronQuinn/Smartspacer) is an app made by KieronQuinn that aims to extend Google’s At a Glance’s functionality. It provides a lot more features than Lawnchair’s own implementation due to its dynamic requirements system and it's plugins.

In Lawnchair 14, we now have added support for the Smartspacer SDK! This means that you can now use Smartspacer with all the At a Glance features not possible before — animations, horizontal scrolling, and more! Thanks a lot to him as well for implementing the initial PR to have this feature within Lawnchair.

### Theming

Themers rejoice, we have added a lot of options for customizing Lawnchair!

- Ability to hide the Dock
- Custom icon shape picker
- Tweaked icon pack picker
- More padding, color, and size customizations
- More font support

And many many more!

### Upcoming

We're not stopping here! Here's some of the features that will (hopefully) be added in the next version:

- V2 multiple icon pack system
- Responsive Settings user interface
- No app drawer mode
- More custom colors for each components (including full Material colors customization)
- Drawer tabs (i.e. flowerpot)

### Thanks

We'd like to give thanks to all of our core team members, particularly MrSluffy for reviving Lawnchair’s development. We'd also like to thank all the contributors that added many functionalities and fixed bugs in Lawnchair. Also, we'd like to thank the community for still supporting Lawnchair even at it's lowest point.
