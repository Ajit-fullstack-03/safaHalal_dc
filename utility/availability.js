import Swal from "sweetalert2";

// const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const DAY_MAP = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

/**
 * DST-safe availability checker (Universal)
 */

const DAY_KEYS = ["sun","mon","tue","wed","thu","fri","sat"];

export function isAvailable({
  available_days = null,
  start_time = null,
  end_time = null,
  currentDate = new Date(),
  outofStock = null,
  categoryName = null
}) {
  
  if (outofStock === "Y") return false;

  /* ---------- NORMALIZE DATE ---------- */
  const now =
    currentDate instanceof Date
      ? currentDate
      : new Date(currentDate.replace(" ", "T"));

  /* ---------- DAY CHECK ---------- */
  if (available_days) {
    let days = [];

    try {
      days = Array.isArray(available_days)
        ? available_days
        : JSON.parse(available_days);
    } catch {
      days = [];
    }

    if (days.length) {
      const today = DAY_KEYS[now.getDay()];
      if (!days.includes(today)) return false;
    }
  }

  /* ---------- TIME CHECK ---------- */
  if (start_time && end_time) {
    
    const toMinutes = (time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const startMinutes = toMinutes(start_time);
    const endMinutes = toMinutes(end_time);

    const currentMinutes =
      now.getHours() * 60 + now.getMinutes();
    // NORMAL RANGE
    if (startMinutes <= endMinutes) {
      return currentMinutes >= startMinutes &&
             currentMinutes <= endMinutes;
    }
    
    // CROSS MIDNIGHT (10:00 → 01:00)
    return currentMinutes >= startMinutes ||
           currentMinutes <= endMinutes;
  }

  return true;
}

// export function isAvailable({
//   available_days = null,
//   start_time = null,
//   end_time = null,
//   currentDate = new Date(),
//   outofStock = null,
//   timeZone = "America/New_York",
// }) {
//   /* ---------- NORMALIZE DATE ---------- */
//   let baseDate;

//   if (currentDate instanceof Date) {
//     baseDate = currentDate;
//   } else if (typeof currentDate === "string") {
//     baseDate = new Date(currentDate.replace(" ", "T"));
//   } else {
//     return true; // fail-safe
//   }

//   /* ---------- GET NY TIME ---------- */
//   const now = new Date(
//     baseDate.toLocaleString("en-US", { timeZone })
//   );

//   if(outofStock == 'Y'){
//     return false;
//   }

//   /* ---------- DAY CHECK ---------- */
//   if (available_days) {
//     let days = [];

//     if (Array.isArray(available_days)) {
//       days = available_days;
//     } else {
//       try {
//         days = JSON.parse(available_days);
//       } catch {
//         days = [];
//       }
//     }

//     if (days.length > 0) {
//       const today = DAY_KEYS[now.getDay()];
//       if (!days.includes(today)) return false;
//     }
//   }

//   /* ---------- TIME CHECK ---------- */
//   if (start_time && end_time) {
//     // const [sh, sm] = start_time.split(":").map(Number);
//     // const [eh, em] = end_time.split(":").map(Number);

//     // const start = new Date(now);
//     // start.setHours(sh, sm, 0, 0);

//     // const end = new Date(now);
//     // end.setHours(eh, em, 0, 0);

//     // if (now < start || now > end) return false;
//     // extract HH:mm from times
//     const toMinutes = (time) => {
//       const [h, m] = time.split(":").map(Number);
//       return h * 60 + m;
//     };

//     const currentTime = currentDate.split(" ")[1].slice(0, 5); // HH:mm

//     const startMinutes = toMinutes(start_time);
//     const endMinutes = toMinutes(end_time);
//     const currentMinutes = toMinutes(currentTime);

//     return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
//   }

//   return true;
// }

/**
 * Human readable days (Universal)
 */
export function formatDays(available_days) {
  let days = [];

  if (Array.isArray(available_days)) {
    days = available_days;
  } else {
    try {
      days = JSON.parse(available_days ?? "[]");
    } catch {
      days = [];
    }
  }

  return days.map(d => DAY_MAP[d] || d).join(", ");
}

export function formatTime12h(time) {
  if (!time) return "";

  const [h, m] = time.split(":").map(Number);

  const hour12 = h % 12 || 12;
  const period = h >= 12 ? "pm" : "am";

  return `${hour12.toString().padStart(2, "0")}.${m
    .toString()
    .padStart(2, "0")} ${period}`;
}

export function isDayValid(days, currentDate, alert) {
  let availableDays = [];
  try {
    availableDays = JSON.parse(days ?? "[]");
  } catch (e) {
    availableDays = [];
  }
  if (Array.isArray(availableDays) && availableDays.length > 0) {
    const date = new Date(
      currentDate.replace(" ", "T") + "-05:00" // America/New_York
    );

    const today = date
      .toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "America/New_York",
      })
      .toLowerCase();

    if (!availableDays.includes(today)) {
      const readableDays = availableDays
        .map(day => DAY_MAP[day] || day)
        .join(", ");
      if (alert) {
        Swal.fire({
          icon: "warning",
          title: `Ajit This item is available only on ${readableDays}`,
        });
      }
      return false;
    }
    return true;
  } else {
    return true;
  }
}
