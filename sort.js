/* Sort Class: Handles sorting */
class Sort {
  static mainSort() {
    switch (sorting_state) {
      // If sorting_state is up
      case "up": {
        // If current_filter is in the form of Strings
        if (filter === "first_name" || filter === "last_name") {
          database.sort((a, b) => a[filter].localeCompare(b[filter]));
        }
        // If current_filter is in the form of Integers
        else {
          database.sort(
            (a, b) => parseFloat(a[filter]) - parseFloat(b[filter])
          );
        }
        break;
      }

      // If sorting_state is down
      case "down": {
        // Same as the content above
        if (filter === "first_name" || filter === "last_name") {
          database.sort((a, b) => b[filter].localeCompare(a[filter]));
        }
        // Same as the content above
        else {
          database.sort(
            (a, b) => parseFloat(b[filter]) - parseFloat(a[filter])
          );
        }
        break;
      }
    }
  }
}
