# Lawnchair FAQ

Welcome to the Lawnchair FAQ! This page provides answers to frequently asked questions about projects relating to Lawnchair, including Lawnicons.

Last updated: March 1, 2025

## Getting started

### What is Lawnchair?

Lawnchair is an Android launcher based on Launcher3 with the goal of replicating Pixel Launcher while providing many customizations to its features.

### Where can I download Lawnchair?

There are several ways to download Lawnchair:

#### Official beta releases

These releases tend to be more stable and are recommended for the majority of users.
- On the website: https://lawnchair.app/downloads
- On GitHub: https://github.com/LawnchairLauncher/lawnchair/releases
- On Play Store: https://play.google.com/store/apps/details?id=app.lawnchair.play

#### Nightly releases

These builds offer the latest features and bug fixes at a cost of potentially lower stability or new bugs. Recommended for testers and enthusiasts. Always back up your Lawnchair settings before installing a nightly build.

- On GitHub: https://github.com/LawnchairLauncher/lawnchair/releases/tag/nightly

Nightly builds install as a separate app compared to normal builds and have a built-in updater system.

#### Lawnicons

Lawnicons is an icon pack that aims to recreate themed icons for many launchers.
- On the website: https://lawnchair.app/downloads
- On GitHub: https://github.com/LawnchairLauncher/lawnicons/releases
- On Play Store: https://play.google.com/store/apps/details?id=app.lawnchair.lawnicons.play

### What's the difference between the Play Store, Telegram/Discord, and GitHub releases?

- GitHub: the primary source for all official releases (stable/beta) and nightly development builds for both Lawnchair and Lawnicons.
- Telegram and Discord: mirrors of the GitHub releases
- Play Store: has Lawnicons and Lawnchair (under a different package name). Also has the unsupported Lawnchair Legacy version. Note that these apps install as a separate version from the GitHub releases.

### What's the latest version of Lawnchair?

The latest official release is [Lawnchair 15 Beta 2.1](https://github.com/LawnchairLauncher/lawnchair/releases/tag/v15.0.0-beta2.1). We are also developing newer versions of Lawnchair 15 in our nightly builds.

### What happened to Lawnchair Legacy?

[Lawnchair Legacy](https://play.google.com/store/apps/details?id=ch.deletescape.lawnchair.plah) (previously known as Lawnchair v2) is an older stable release of Lawnchair that we no longer support. Due to limited resources, developers are focused on the latest versions of Lawnchair.

### Is Lawnchair free? Is it open source?

Yes to both! You can view our repository on [GitHub](https://github.com/LawnchairLauncher/lawnchair).

## Common questions

### How to use themed icons?

To use themed icons, [download Lawnicons](#Lawnicons) and enabled Themed Icons in Lawnchair (*Home settings > General > Icon style > Themed icons*). You can then enable it on either the home screen or app drawer.

### How to use Smartspacer?

[Smartspacer](https://github.com/KieronQuinn/Smartspacer) is an app that provides a widget similar to Google Pixel's At a Glance feature. It allows you to customize what is shown in there and add additional content.

To use Smartspacer on Lawnchair, go to *Home settings > At a Glance > At a Glance provider*, then select "Smartspacer".

### How to enable the Google Feed?

First, turn on "Show feed" under *Home settings > Home screen*. The next steps depend on your downloaded version:

- For nightly builds, simply select "Google" in *Home settings > Home screen > Feed provider*.
- For GitHub, Discord, or Telegram builds, [download Lawnfeed 3](https://lawnchair.app/downloads), then select "Google" in *Home settings > Home screen > Feed provider*.
- For the play store release, you will need to download [AIDL Bridge](https://github.com/amirzaidi/AIDLBridge/releases), then select "AIDL Bridge" in *Home settings > Home screen > Feed provider*. This is due to a limitation regarding the current version of Lawnfeed.

### Google Feed still doesn't work!

If Google Feed still doesn't work, try the following steps:

- Turn on/off the "Show feed" setting in *Home settings > Home screen*.
- Force stop the Google app, and restart Lawnchair.
- Download AIDL Bridge and use it as the feed provider instead.
- Restart your device.

If it still doesn't work after you tried the above steps, try waiting. The issue sometimes fixes itself over time. 

### How do I hide applications from my app drawer?

Long-press on the app you want to hide, tap on "Customize" or the pencil icon, then select "Hide from App Drawer" 


### What is QuickSwitch? (for rooted users only)
[QuickSwitch](https://github.com/skittles9823/QuickSwitch) is a Magisk module that enables third-party launchers (like Lawnchair) to access the Recents (QuickStep) APIs, therefore allowing support for Recents customization and more features. This allows for smoother animations and better integration with the system.

Currently, Lawnchair 15 Beta 1 supports QuickSwitch from Android 10 to Android 15 QPR 1.

The nightly builds support Android 10-15, but keep in mind that there will still be bugs regarding its implementation (which can cause crashes). Support for Android 15 QPR2 and newer OS preview/beta versions can vary and may not be immediately available.



## Common issues

### Restricted settings on Android 13+

Due to security reasons, Android 13+ disallows notifications access and accessibility services by default. To allow these functionality for Lawnchair, follow these steps:

1. Ensure that you have seen the "restricted settings" pop-up first, by either turning on notification access or the accessibility service.
1. Go to *Home settings > Three-dots at the top right > App info*
1. On the system settings screen, click the three dots at the top right, and tap "Allow restricted settings"
    - It is important that you seen the pop-up at least once for this menu to show up.
1. Go back to the setting that you want to turn on. You should be able to turn these on.

See [the support page on Google](https://support.google.com/android/answer/12623953#allowrestrictedsettings) for more information.

### Adding widgets does nothing or cause Lawnchair to crash

> [!TIP]
> **This issue have been fix in Lawnchair 15 Beta 2.1 and newer!**

This is a relatively common issue, especially when the widget has a set-up screen. This issue has been fixed on Android 14 and above, but for older Android versions (or if you are still having issues), follow these steps:

1. Change the default launcher to your system launcher.
2. Open Lawnchair.
3. Add the widget you wish to add.
4. Re-set Lawnchair as the default launcher.

### Some parts of the UI look weird (i.e. themed icons) on dark mode

Disable force-dark on your phone's settings.


### I'm having issues with gesture navigation

> [!TIP]
> **This issue have been fix in Lawnchair 15 Beta 2.1 and newer!**
>
> If you are still having issue you might want to consider disabling GestureNavContract feature in favor of default opening/closing animation in
> *Home settings > Three-dots at the top right > Experimental features > GestureNavContract API*

Smooth gesture navigation is a priority for a great launcher experience. However, its behavior with third-party launchers like Lawnchair can vary significantly based on your phone's manufacturer (OEM), their Android customization, and your Android version.

Android is designed so the original system launcher often has special privileges for handling gesture animations (like swiping home or accessing the Recents screen) most fluidly. When you switch to a third-party launcher, these integrations might not be as seamless.

1. **For rooted users (Best Experience): QuickSwitch**
    - If your device is rooted, using the **[QuickSwitch Magisk module](https://github.com/skittles9823/QuickSwitch)** is highly recommended.
    - QuickSwitch allows Lawnchair to integrate deeply as the system's QuickStep (Recents) provider, resulting in the smoothest animations and access to more Recents features.
    - See our [QuickSwitch FAQ section](#what-is-quickswitch-for-rooted-users-only) for more details.
2. **For non-rooted users: GestureNavContract API**
    - If you are using Lawnchair 15 Beta 2.1, disable the GestureNavContract API to revert back to default animation in *Home settings > Three-dots at the top right > Experimental features > GestureNavContract API*.
    - Lawnchair implements Google's **GestureNavContract API** (Android 11+) for non-rooted devices. This API helps improve animation smoothness for actions like app open/close and returning home.
    - **Note:** The effectiveness of GestureNavContract depends heavily on how well your device manufacturer has implemented it. Devices with AOSP-like Android versions (such as Google Pixel, Nothing Phone, Fairphone, or custom ROMs based on AOSP) tend to have better results. Devices with heavily customized Android skins (e.g., MIUI, ColorOS, OneUI) may still exhibit more issues.
  
#### Common gesture-related issues you might encounter

Even with Lawnchair's efforts, you might experience some of the following, especially on non-rooted devices or heavily customized Android versions:

- Some OEMs like Xiaomi block gesture navigation on custom launchers entirely 
- Not being able to tap icons or widgets for a short time after going home
- Home screen content flashing or disappearing entirely when tapping icons quickly after swiping home
- Home animations not being as fluid as expected or completely non-existent
- Opening animations not working when quickly opening an app after swiping home
- A short delay before the home screen content appears when swiping home
  - Oppo (therefore OnePlus and Realme) introduced this issue with their Android 14 update but it may also be present on other devices and versions.

This list might not include every possible issue, and you may experience some or none of the issues here.

> [!IMPORTANT]
> These types of gesture issues are typically **limitations or behaviors of the Android system itself or your device manufacturer's specific customizations**, rather than bugs within Lawnchair that we can directly fix without root access (which QuickSwitch provides). Lawnchair's own home screen gestures (configured in *Home Settings > Gestures*) are separate and fully controlled by us.
> 
> While we strive to offer the best gesture experience possible within Android's constraints, the most seamless gesture navigation is often found on devices running AOSP-like software or by using QuickSwitch on rooted devices.


## Development and future

### When is the next update?

Nobody knows, not even us developers. We have other hobbies and jobs, or even school, and cannot full-time code to meet a deadline. That's why we don't give ETAs. (In case you were wondering, ETA means Estimated Time of Arrival, which means "when is the next version").

### What features are planned?

Our development is community-driven and based on volunteer availability, so priorities can shift. While we don't have specific plans on when to implement these features, we do wish to implement the following soon:

- Multiple icon packs
- Better app drawer categories
- Improved icon pack customization and support
- Advanced color customization

### Is development still active?

Lawnchair is still being actively developed (see our nightly builds), but development can vary depending on volunteer availability. While there can be periods of stagnation, we do try our best to keep improving Lawnchair and bringing new features when time and resources allow.


## Contributing and getting help
### I want to report a bug
[Create a bug report](https://github.com/LawnchairLauncher/lawnchair/issues/new?assignees=&labels=bug&template=bug_report.yaml&title=%5BBUG%5D+) on GitHub.

### I want to request a feature
[Create a feature request on GitHub](https://github.com/LawnchairLauncher/lawnchair/issues/new?assignees=&labels=feature%2Cenhancement&template=feature_request.yaml&title=%5BFEATURE%5D+)

### I want to report a crash
Use the [bug report form](https://github.com/LawnchairLauncher/lawnchair/issues/new?assignees=&labels=bug&template=bug_report.yaml&title=%5BBUG%5D+) to report a crash. In the "Additional Information" section, please provide a crash log. Details on how to get one are listed below. 

Lawnchair (versions 12 Alpha 3 and newer, including current releases) automatically sends a notification when Lawnchair crashes. tap "Upload file" to get a link to paste in the "Additional information" section of the issue.

On Android 14 and above, you will need to turn on notifications before you receive these crash logs.

### I want to contribute code to Lawnchair
Thanks for your interest in contributing! Please visit [our contributing guide](https://github.com/LawnchairLauncher/lawnchair/blob/15-dev/CONTRIBUTING.md) for information about contributing to Lawnchair.

### I want to donate to Lawnchair
You can donate to Lawnchair via [Open Collective](https://opencollective.com/lawnchair).

### I want to help translate Lawnchair
[Visit Crowdin](https://lawnchair.crowdin.com/lawnchair) for more information. Note that chats there are not being monitored actively; it's best to use Telegram or Discord if you have any questions or requests.

### I need help regarding Lawnchair
You can visit our [Telegram chat](https://t.me/lccommunity) or [Discord server](https://discord.gg/3x8qNWxgGZ) for help regarding Lawnchair. Other community spaces might contain varying degrees of support.

