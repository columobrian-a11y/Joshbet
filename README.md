# betterjoshua

A daily diary site for tracking sleep, health & exercise, mood, habits,
and activities — with a colour-coded calendar, a diary feed, a progress
page, and a photo gallery.

Plain HTML, CSS and JavaScript. No build step, no framework, no
dependencies to install.

## Files

| File        | What it's for                                                |
|-------------|----------------------------------------------------------------|
| `index.html`| Page structure and all the tabs                                |
| `style.css` | All colours, fonts, and layout — edit the variables at the top |
| `script.js` | Renders the calendar, diary list, progress chart, photo grid   |
| `data.js`   | **Your actual diary data.** This is the file you edit every day |
| `photos/`   | Put your uploaded photos here                                  |

## 1. Put this on GitHub

1. Create a new repository on GitHub (e.g. `betterjoshua`).
2. Upload all the files in this folder to it (drag-and-drop works, or
   use "Add file → Upload files").
3. Commit.

## 2. Deploy with Netlify

1. On [netlify.com](https://netlify.com), click **Add new site → Import
   an existing project**.
2. Connect your GitHub account and pick the `betterjoshua` repo.
3. Leave the build command blank and the publish directory as `/`
   (this site has no build step — it's already plain HTML/CSS/JS).
4. Click **Deploy**. Your site will be live at a `netlify.app` URL
   (you can rename it or add a custom domain in Netlify's settings).

From now on, any commit you push to GitHub automatically redeploys
the live site within about 30 seconds.

## 3. Add a diary entry (every day)

The site can't save data by itself — it's a static site with no
server or database, so there's nowhere for it to write to. Instead,
your diary data lives directly in `data.js`, inside your GitHub repo.
That means it's saved for good (not just in one browser) and shows up
for anyone who visits the site.

1. Open the live site → **Add entry** tab → fill in the form.
2. Click **Generate code**, then **Copy to clipboard**.
3. On GitHub, open `data.js`, click the pencil icon to edit.
4. Paste the copied block inside the `entries: [ ... ]` list (add a
   comma after the entry above it).
5. Commit. Netlify redeploys automatically.

Full step-by-step instructions are also built into the site itself,
under the **Setup guide** tab.

## 4. Add a photo

1. On GitHub, open the `photos` folder → **Add file → Upload files**.
2. Upload your image (simple filename, no spaces — e.g. `beach.jpg`).
3. Commit.
4. In the relevant entry in `data.js`, add `"photos/beach.jpg"` to
   that entry's `photos` list.

A placeholder image, `photos/example.jpg`, is included so you can see
how it looks before adding your own.

## 5. Customise

- **Colours & fonts**: edit the `:root` variables at the top of
  `style.css`.
- **Habits you track**: edit `HABIT_LIST` at the top of `data.js`.
  The "Add entry" form and progress page pick this up automatically.
- **Add a new tab**: add a `<button>` in the `<nav>` of `index.html`
  with a `data-view="yourname"`, then add a matching
  `<section id="view-yourname" class="view">` in `<main>`.

Every file has comments explaining what each part does — open them
in GitHub's editor whenever you want to make a change.
