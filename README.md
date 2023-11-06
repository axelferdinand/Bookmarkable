# Bookmarkable
Bookmarkable.js is a lightweight JavaScript library designed to easily add bookmark functionality to your website. With just a few simple steps, your users can quickly mark and revisit their favorite content.

## Features:
**Easy Bookmarking:** Allow users to mark their favorite content with a single click.

**List Favorites:** When content is bookmarked, favorites are automatically listed where you prefer to list them.

**Editable List:** Option to remove favorites you no longer use.

**Notifications:** Feedback is provided when a bookmark is added or removed.

**Timestamps:** See how long ago a bookmark was added.

## How to Use:
1. Include `bookmarkable.js` in your project, either at the end of your project markup or using `defer` if you include it in the head.
2. Add the class `.bookmarkable` to any container with content you would like to be bookmarkable.
3. Add `<div class="bookmarkable__bookmarks"></div>` anywhere you would like your bookmarks to be listed.
4. Include and compile the provided `bookmarkable.scss` file for default styles.
5. Start bookmarking!

## Example:
Add the class `.bookmarkable` to every container with content you would like to be bookmarkable, AND to the container where you would like to list the bookmarked content.

```
<div class="bookmarkable"><!-- Add this class -->
  <h1>Your content</h1>
  <p>...goes here</p>

  <div class="bookmarkable__bookmarks"></div><!-- Your bookmarks are listed within this container -->
</div>

<script src="/js/bookmarkable.js"></script>
<script src="/css/bookmarkable.css"></script>
```

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

## Script output
Here's an example with markup the script outputs, to help you better understand how to adapt it to your project:

```
<div class="bookmarkable"><!-- Add this class to your content container -->
  <h1 class="bookmarkable__title bookmarkable__title--bookmarked" id="your-unique-title"><!-- Classes and IDs are automatically added -->
    Your unique title
    <button class="bookmarkable__title__bookmark" type="button"><!-- Bookmark toggle button is automatically addded -->
      <i class="bookmarkable__title__bookmark__icon"></i>
    </button>
  </h1>

  <div class="bookmarkable__bookmarks"><!-- Add this container, and your bookmarks are automatically listed within -->
    <div class="bookmarkable__bookmarks__item">
      <a class="bookmarkable__bookmarks__item__link" href="https://your-domain.com/your-url#your-unique-title">
        <div class="bookmarkable__bookmarks__item__link__title">
          <i class="bookmarkable__bookmarks__item__link__title__icon"></i>
          Your unique title
        </div>
        <div class="bookmarkable__bookmarks__item__link__date">
          A few seconds ago
        </div>
      </a>
      <button class="bookmarkable__bookmarks__item__button" type="button">
        <i class="bookmarkable__bookmarks__item__button__icon"></i>
      </button>
      <div class="bookmarkable__bookmarks__item__actions" style="display: none;">
        <button class="bookmarkable__bookmarks__item__actions__item" type="button">
          <i class="bookmarkable__bookmarks__item__actions__item__icon bookmarkable__bookmarks__item__actions__item__icon--new-tab"></i>
            <span class="bookmarkable__bookmarks__item__actions__item__title">Open in new tab</span>
        </button>
        <button class="bookmarkable__bookmarks__item__actions__item" type="button">
          <i class="bookmarkable__bookmarks__item__actions__item__icon bookmarkable__bookmarks__item__actions__item__icon--remove"></i>
          <span class="bookmarkable__bookmarks__item__actions__item__title">Remove from favorites</span>
        </button>
      </div>
    </div>
  </div>

</div>

<script src="/js/bookmarkable.js"></script>
<script src="/css/bookmarkable.css"></script>
```
