# LAB practice with fetch API and axios - AJAX

## Table of Contents

- [About](#about)
- [Technologies](#technologies)
- [Codesanbox link](#codesanbox-link)

## About

The webiste is a practice of using `Fetch API` and `axios` for `AJAX`.
The tasks: 
1. To create function initailLoad() that would append list of cats from API and append it to the select element.
2. Add event handler to option element, so when user clicks the breed it would append images to the boostrap carousel.
 - the sub task what to append some additional info about cat, I created the table with some info.
3. Refactor 1. and 2. into axios.
4. Use interceptors to log time between request and response.
5. Use ProgressEvent object to change progressBar element.
6. Change cursor for 'progress' when request is sent.
7. Add event handler to favourites: 
- if the image exists - send axios.delete to delete img from fav
- if the image doesn't exists - send axios.post to add img to fav
8. Create getFavourite() so when clicked on button it appends favourtie to carousel.
9. When clicked on a breed that does not have data it will append a message. Like 'Malayan' cat.

## Technologies

- HTML
- CSS
- JavaScript
- fetch API
- axios
- Bootstrap

## CodeSanbox link

https://codesandbox.io/p/github/Agata10/Axios-LAB
