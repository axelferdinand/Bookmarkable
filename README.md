# Bookmarkable
Bookmarkable.js is a lightweight JavaScript library designed to easily add bookmark functionality to your website. With just a few simple steps, your users can quickly mark and revisit their favorite content.

## Features:
**Easy Bookmarking:** Allow users to mark their favorite content with a single click.

**List Favorites:** When content is bookmarked, favorites are automatically listed where you prefer to list them.

**Editable List:** Option to remove favorites you no longer use.

**Notifications:** Feedback is provided when a bookmark is added or removed.

**Timestamps:** See how long ago a bookmark was added.

## How to Use:
1. Include `bookmarkable.js` in your project.
2. Add the class `.bookmarkable` to any container with content you would like to be bookmarkable.
3. Include the provided bookmarkable.scss file for default styles.
4. Start bookmarking!

## Configuration:
In the beginning of `bookmarkable.js` you find this config section:

```
const CONFIG = {
  BOOKMARKABLE_HEADINGS: ['h1', 'h2'],
  NO_BOOKMARKS_MESSAGE: "Use the bookmark function to add a paragraph or a page as a favorite, so you can quickly find your way back to the content!",
  BOOKMARK_ADDED_NOTIFICATION: "You added a new favorite!",
  BOOKMARK_REMOVED_NOTIFICATION: "You removed a favorite",
  OPEN_IN_NEW_TAB: "Open in new tab",
  REMOVE_FROM_FAVORITES: "Remove from favorites",
  DATE_STAMP: {
    AGO: "ago",
    A_FEW_SECONDS_AGO: "A few seconds ago",
    MONTH: "month",
    MONTHS: "months",
    WEEK: "week",
    WEEKS: "weeks",
    YESTERDAY: "Yesterday",
    DAY: "day",
    DAYS: "days",
    HOUR: "hour",
    HOURS: "hours",
    MINUTE: "minute",
    MINUTES: "minutes"
  },
};
```

As you can see, you are free to select which type of selectors that can be bookmarkable. By default, only H1 og H2 are possible to bookmark.

The other variables are used when you have no bookmarks, when you add a new bookmark or remove one, for the favorites option menu and the timestamp that is added each time you bookmark something. Feel free to update the variables to fit your needs.

Here's an example with markup the script outputs:

```
<div class="bookmarkable">



</div>
```
