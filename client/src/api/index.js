// The only file your components import from.
//
// Swapping the simulated backend for your real API is one environment
// variable, set at BUILD time. Nothing in src/components or src/pages
// changes.
//
//   VITE_USE_MOCK_API=false  -> your Express API at VITE_API_BASE_URL
//   anything else, INCLUDING UNSET -> the browser-only fake
//
// Note which way round that is. Demo mode is the DEFAULT, so a fresh copy of
// this template builds into a working site before you have configured
// anything.
//
// Both modules are imported statically and one is chosen at run time.
// `await import(...)` here would fail the build: top-level await is not
// available in Vite's default browser target.

import * as mockApi from './mockApi.js'
import * as httpApi from './httpApi.js'

export const USING_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

const implementation = USING_MOCK_API ? mockApi : httpApi

export const {
  listExercises,
  getExercise,
  listSetsForExercise,
  listToday,
  createSet,
  deleteSet,
} = implementation
