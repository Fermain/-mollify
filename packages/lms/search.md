# LMS Search

The LMS search feature is created using fuse search, and expanded upon with further filters. A basic search can be achieved by typing a query into the search bar and the lookahead will return a dropdown of results. If you press enter, you will be taken to the search page, where you can further filter your results through a UI.

The search with take any space " " to mean this term AND this term, the use of "|" will mean this term OR this term.

## Features and Filtering

The search supports filtering results by tags, type, and institution. The search will also support excluding results, and exact matches.

### Exact Matches

Exact matches can be achieved by wrapping the query in quotes, this will return results that match the query exactly.

Here is an example of an exact match search for "JavaScript Fundamentals":

```
"JavaScript Fundamentals"
```

### Exclusions

On the search UI there is a input for exclusions, these are separated using ", ", but can also be achieved by typing the exclusions into search bar starting with an !.

Here is an example of excluding the tag "javascript":

```
query !javascript
```

### Type

On the search UI the type has a selection of checkboxes to select the desired types. This can also be achieved by typing the types into the search bar like so and the drop down will filter the result or pressing enter will take you to the search page with the results filtered and UI updated.

Here an example of a search for courses and modules:

```
query type:"course, module"
```

### Tags

On the search UI there is a input for tags, these are separated using ", ", but can also be achieved by typing the tags into the search bar like so and the drop down will filter the result or pressing enter will take you to the search page with the results filtered and UI updated.

Here an example of a search for javascript and web development:

```
query tags:"javascript, web development"
```

### Institution

On the search UI there is a dropdown for institution, this will show all the institutions that are available to the user. This can also be achieved by typing into the search bar if the provided institution isn't in the dropdown it will revert to all institutions.

Here an example of a search query for the institution "Hackademic":

```
query institution:"Hackademic"
```
