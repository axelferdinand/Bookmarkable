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

document.addEventListener("DOMContentLoaded", function() {
  
  makeHeadingsBookmarkable();
  showBookmarkedHeadings();

  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView();
      }
    }, 0);
  }

});

let currentlyOpenActions = null;

document.addEventListener('click', function(event) {
  if (!event.target.closest('.bookmarkable')) return;
  if (currentlyOpenActions && !event.target.closest('.bookmarkable__bookmarks__item')) {
    currentlyOpenActions.style.display = 'none';
    currentlyOpenActions = null;
  }
});

function generateID(text) {
  return text.trim().toLowerCase().replace(/[^a-z0-9æøå]+/g, '-');
}

function updateHeadingBookmarkIcon(headingId, isBookmarked) {
  const heading = document.querySelector('#' + headingId);
  if (heading) {
    const icon = heading.querySelector('.bookmarkable__title__bookmark__icon');
    if (icon) {
      icon.className = isBookmarked
        ? 'bookmarkable__title__bookmark__icon fa-solid fa-bookmark'
        : 'bookmarkable__title__bookmark__icon fa-regular fa-bookmark';
    }
    // Here we toggle the class based on the isBookmarked status
    heading.classList.toggle("bookmarkable__title--bookmarked", isBookmarked);
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'bookmarkable__notification';
  notification.classList.add('animate__animated');
  notification.classList.add('animate__fadeInUp');

  const icon = document.createElement('i');
  icon.className = 'bookmarkable__notification__icon fa-solid fa-bookmark';
  notification.appendChild(icon);

  const span = document.createElement('span');
  span.className = 'bookmarkable__notification__title';
  span.textContent = message;
  notification.appendChild(span);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('animate__animated');
    notification.classList.add('animate__fadeOutDown');
    notification.addEventListener('transitionend', function() {
      document.body.removeChild(notification);
    });
  }, 3000);
}

function toggleBookmark(heading) {
  const current_url = window.location.origin + window.location.pathname;
  let bookmarkedHeadings = JSON.parse(localStorage.getItem('bookmarkedHeadings')) || [];
  const itemIndex = bookmarkedHeadings.findIndex(item => item.id === heading.id && item.url === current_url);

  if (itemIndex > -1) {
    bookmarkedHeadings.splice(itemIndex, 1);
    showNotification(CONFIG.BOOKMARK_REMOVED_NOTIFICATION);
    updateHeadingBookmarkIcon(heading.id, false);
  } else {
    bookmarkedHeadings.unshift({ id: heading.id, text: heading.textContent, url: current_url, date: new Date().toISOString() });
    showNotification(CONFIG.BOOKMARK_ADDED_NOTIFICATION);
    updateHeadingBookmarkIcon(heading.id, true);
  }

  localStorage.setItem('bookmarkedHeadings', JSON.stringify(bookmarkedHeadings));
  showBookmarkedHeadings();
}

function makeHeadingsBookmarkable() {
  let bookmarkedHeadings = JSON.parse(localStorage.getItem('bookmarkedHeadings')) || [];
  const selector = CONFIG.BOOKMARKABLE_HEADINGS.map(tag => `.bookmarkable ${tag}`).join(', ');
  const headings = document.querySelectorAll(selector);

  headings.forEach(heading => {
    if (!heading.id) {
      heading.id = generateID(heading.textContent);
    }

    heading.classList.add("bookmarkable__title");
    let base_url = window.location.origin + window.location.pathname;
    const isBookmarked = bookmarkedHeadings.some(item => item.id === heading.id && item.url === base_url);

    const button = document.createElement('button');
    button.className = "bookmarkable__title__bookmark";
    button.type = "button";

    const icon = document.createElement('i');
    icon.className = isBookmarked ? "bookmarkable__title__bookmark__icon fa-solid fa-bookmark" : "bookmarkable__title__bookmark__icon fa-regular fa-bookmark";
    button.appendChild(icon);
    heading.appendChild(button);

    button.addEventListener("click", function() {
      toggleBookmark(heading);
    });
  });
}

function showBookmarkedHeadings() {
  let bookmarkedHeadings = JSON.parse(localStorage.getItem('bookmarkedHeadings')) || [];
  console.log("Nåværende bokmerkede overskrifter:", bookmarkedHeadings);
  const container = document.querySelector('.bookmarkable__bookmarks');
  container.innerHTML = '';

  if (bookmarkedHeadings.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'bookmarkable__bookmarks__item bookmarkable__bookmarks__item--empty';
    emptyMessage.innerHTML = '<i class="bookmarkable__bookmarks__item__icon fa-regular fa-bookmark"></i><p class="bookmarkable__bookmarks__item__title">' + CONFIG.NO_BOOKMARKS_MESSAGE + '</p>';
    container.appendChild(emptyMessage);
    return;
  }

  bookmarkedHeadings.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'bookmarkable__bookmarks__item';

    const link = document.createElement('a');
    link.className = 'bookmarkable__bookmarks__item__link';
    link.href = item.url + "#" + item.id;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'bookmarkable__bookmarks__item__link__title';
    titleDiv.innerHTML = '<i class="bookmarkable__bookmarks__item__link__title__icon fa-solid fa-bookmark"></i> ' + item.text;
    link.appendChild(titleDiv);

    const dateDiv = document.createElement('div');
    dateDiv.className = 'bookmarkable__bookmarks__item__link__date';
    const date = new Date(item.date);
    dateDiv.innerText = timeSince(date);
    link.appendChild(dateDiv);

    div.appendChild(link);

    const button = document.createElement('button');
    button.className = 'bookmarkable__bookmarks__item__button';
    button.type = 'button';
    button.innerHTML = '<i class="bookmarkable__bookmarks__item__button__icon fas fa-ellipsis-h"></i>';
    div.appendChild(button);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'bookmarkable__bookmarks__item__actions';
    actionsDiv.innerHTML = `
      <button class="bookmarkable__bookmarks__item__actions__item" type="button">
        <i class="bookmarkable__bookmarks__item__actions__item__icon bookmarkable__bookmarks__item__actions__item__icon--new-tab fa-solid fa-up-right-from-square"></i>
        <span class="bookmarkable__bookmarks__item__actions__item__title">${CONFIG.OPEN_IN_NEW_TAB}</span>
      </button>
      <button class="bookmarkable__bookmarks__item__actions__item" type="button">
        <i class="bookmarkable__bookmarks__item__actions__item__icon bookmarkable__bookmarks__item__actions__item__icon--remove fa-solid fa-trash"></i>
        <span class="bookmarkable__bookmarks__item__actions__item__title">${CONFIG.REMOVE_FROM_FAVORITES}</span>
      </button>
    `;
    actionsDiv.style.display = 'none';
    div.appendChild(actionsDiv);

    button.addEventListener('click', function() {
      if (currentlyOpenActions) {
        currentlyOpenActions.style.display = 'none';
        if (currentlyOpenActions === actionsDiv) {
          currentlyOpenActions = null;
          return;
        }
      }
      actionsDiv.style.display = 'flex';
      currentlyOpenActions = actionsDiv;
    });

    const openNewTabButton = actionsDiv.querySelector('.bookmarkable__bookmarks__item__actions__item:nth-child(1)');
    const removeFromFavoritesButton = actionsDiv.querySelector('.bookmarkable__bookmarks__item__actions__item:nth-child(2)');

    openNewTabButton.addEventListener('click', function() {
      window.open(item.url + "#" + item.id, '_blank');
    });

    removeFromFavoritesButton.addEventListener('click', function() {
      const headingToRemove = document.getElementById(item.id);
      if (headingToRemove) {
        toggleBookmark(headingToRemove);
      }
    });

    container.appendChild(div);
  });
}

function timeSince(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  const intervals = [
    { seconds: 31536000, text: CONFIG.DATE_STAMP.A_FEW_SECONDS_AGO },
    { seconds: 2592000, text: (count) => count === 1 ? `${count} ${CONFIG.DATE_STAMP.MONTH} ${CONFIG.DATE_STAMP.AGO}` : `${count} ${CONFIG.DATE_STAMP.MONTHS} ${CONFIG.DATE_STAMP.AGO}` },
    { seconds: 604800, text: (count) => count === 1 ? `1 ${CONFIG.DATE_STAMP.WEEK} ${CONFIG.DATE_STAMP.AGO}` : `${count} ${CONFIG.DATE_STAMP.WEEKS} ${CONFIG.DATE_STAMP.AGO}` },
    { seconds: 86400, text: (count) => count === 1 ? CONFIG.DATE_STAMP.YESTERDAY : count === 2 ? `${count-1} ${CONFIG.DATE_STAMP.DAY} ${CONFIG.DATE_STAMP.AGO}` : `${count} ${CONFIG.DATE_STAMP.DAYS} ${CONFIG.DATE_STAMP.AGO}` },
    { seconds: 3600, text: (count) => count === 1 ? `1 ${CONFIG.DATE_STAMP.HOUR} ${CONFIG.DATE_STAMP.AGO}` : `${count} ${CONFIG.DATE_STAMP.HOURS} ${CONFIG.DATE_STAMP.AGO}` },
    { seconds: 60, text: (count) => count === 1 ? `1 ${CONFIG.DATE_STAMP.MINUTE} ${CONFIG.DATE_STAMP.AGO}` : `${count} ${CONFIG.DATE_STAMP.MINUTES} ${CONFIG.DATE_STAMP.AGO}` }
  ];

  for (let interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
          return typeof interval.text === "function" ? interval.text(count) : interval.text;
      }
  }

  return CONFIG.DATE_STAMP.A_FEW_SECONDS_AGO;
}