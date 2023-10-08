import flatpickr from 'flatpickr';
import ShortcutButtonsPlugin from 'shortcut-buttons-flatpickr';
('use strict');

flatpickr('#startDate', {
  enableTime: true,
  allowInput: true,
  dateFormat: 'm h:iK'
});

// Calendar for Check Availability /Booking Form
flatpickr('#rlr-booking-dateranges-input', {
  altInput: true,
  minDate: 'today',
  altFormat: 'F j, Y',
  dateFormat: 'm-d',
  monthSelectorType: 'static',
  plugins: [
    ShortcutButtonsPlugin({
      button: [
        {
          label: 'Today'
        },
        {
          label: 'Tomorrow'
        }
      ],
      label: 'or',
      onClick: (index, fp) => {
        let date;
        switch (index) {
          case 0:
            date = new Date();
            break;
          case 1:
            date = new Date(Date.now() + 24 * 60 * 60 * 1000);
            break;
        }
        fp.setDate(date);
      }
    })
  ]
});

// Calendar for Add Product Form (How often does this tour take place)

// All Year Round
flatpickr('#rlr_js_product_form_date_multiple', {
  mode: 'multiple',
  minDate: 'today',
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  allowInput: true
});

// All Week Days
flatpickr('#rlr_js_product_form_date_multiple_no_weekends', {
  mode: 'multiple',
  minDate: 'today',
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  allowInput: true,

  disable: [
    function (date) {
      // return true to disable
      return date.getDay() === 0 || date.getDay() === 6;
    }
  ],
  locale: {
    firstDayOfWeek: 1 // start week on Monday
  }
});

// Date ranges for discount
flatpickr('#rlr-js-test-dateranges', {
  mode: 'range',
  minDate: 'today',
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  allowInput: true
});
