import * as _ from 'lodash'

// T => any
type FnT2Any<T> = (value: T) => any;

// T => T
type FnT2T<T> = (value: T) => T;

// T => U
type FnT2U<T, U> = (value: T) => U;

// T => Promise<T>
type FnT2PromiseT<T> = (value: T) => Promise<T>;

// T => Promise<any>
type FnT2PromiseAny<T> = (value: T) => Promise<any>;

// T => Promise<U>
type FnT2PromiseU<T, U> = (value: T) => Promise<U>;

// T => Boolean
type FnPred<T> = (value: T) => boolean;

// T => Boolean
type FnPredPromise<T> = (value: T) => Promise<boolean>;

type nil = null | undefined;

/**
 * runs fn (as a side effect), then returns value.
 * @param fn: T => any
 * @return a function: T => T, 
 *         that takes a value, calls fn(value), then returns value.
 *         similar to _.tap.
 */
export const tap = <T>(fn: FnT2Any<T>): FnT2T<T> => (value: T): T => {
  fn(value)
  return value
}

/**
 * runs tap(fn) iff the if_fn predicate returns truthy
 * @param if_fn: T => boolean
 * @param then_fn: T => any
 * @return fn: (T => Boolean) => (T => any) => (T => T)
 */
export const tapIf = <T>(ifFn: FnPred<T>) => (thenFn: FnT2Any<T>): FnT2T<T> => {
  return (value: T): T => ifFn(value) ? tap(thenFn)(value) : value
}

/**
 * runs fn (as a side effect) and waits for it to complete, then returns value.
 * @param fn: T => Promise<any>
 * @return a function: T => Promise<T> 
 *         value => Promise w/ value
 */
export const tapWait = <T>(fn: FnT2PromiseAny<T>): FnT2PromiseT<T> => (value: T): Promise<T> => {
  return Promise.resolve(fn(value))
    .then(() => value)
}

/**
 * similar to tap but catches and ignores errors produced by fn.
 * @param fn: T => any
 * @return a function: T => T
 */
export const tapCatch = <T>(fn: FnT2Any<T>): FnT2T<T> => (value: T): T => {
  Promise.resolve()
    .then(() => fn(value))
    .catch((err) => console.error('ERROR: tapCatch:', { value, err }))
  
  return value
}

/**
 * runs tap(fn) iff value is not null
 * @param fn: T => any
 * @return fn: T => T | nil
 */
export const tapMaybe = <T>(fn: FnT2Any<T>): FnT2T<T | nil> => (value: T): T | nil => {
  return _.isNil(value) ? value : tap(fn)(value)
}

/**
 * runs fn (as a side effect), then throws the given value.
 * @param fn: T => any
 * @return fn: T => T (technically it always throws an exception)
 */
export const tapThrow = <T>(fn: FnT2Any<T>): FnT2T<T> => (value: T): T => {
  fn(value)
  throw value
}

/**
 * similar to thru but catches and ingores errors produced by fn.
 * returns null if the fn throws an error.
 * @param fn: T => U
 * @return T => Promise<U> | Promise<null>
 */
export const thruCatch = <T, U>(fn: FnT2U<T, U>): FnT2PromiseU<T, U | null> => (value: T): Promise<U> => {
  return Promise.resolve()
    .then(() => fn(value))
    .catch((err) => {
      console.error('ERROR: thru_catch:', { value, err })
      return null
    })
}

/**
 * runs fn and throws the value it returns.
 * @param fn: T => U
 * @return fn: T => U (technically it always throws an exception)
 */
export const thruThrow = <T, U>(fn: FnT2U<T, U>): FnT2U<T, U> => (value: T): U => {
  throw fn(value)
}

/**
 * 
 * @param asyncIfFn: T => Promise<Boolean>
 * @param then_fn: T => T | Promise<T>
 * @return fn: (T => Promise<Boolean>) => (T => T | Promise<T>) => (T => Promise<T>)
 */
export const thruAsyncIf = <T>(asyncIfFn: FnPredPromise<T>) => (thenFn: FnT2T<T> | FnT2PromiseT<T>): FnT2PromiseT<T> => {
  return (value: T): Promise<T> => Promise.resolve(asyncIfFn(value))
    .then(boolValue => !! boolValue ? thenFn(value) : value)
}

/** 
 * runs thenFn iff ifFn returns truthy
 * otherwise runs else_fn.
 * @param ifFn: T => Boolean
 * @param thenFn: T => U
 * @param elseFn: T => U
 * @return fn: (T => Boolean) => (T => U) => (T => U) => (T => U)
 */
export const thruIfElse = <T, U>(ifFn: FnPred<T>) => (thenFn: FnT2U<T, U>) => (elseFn: FnT2U<T, U>): FnT2U<T, U> => {
  return (value: T): U => ifFn(value) ? thenFn(value) : elseFn(value)
}

/**
 * pauses, then returns the value
 * @param ms: milliseconds
 * @return fn: T => Promise<T>
 */
export const pause = <T>(ms: number): FnT2PromiseT<T> => (value: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(value), ms)) 
}

/**
 * @example sf.thru_if( value => value.check_something )( value => { ...do this if true... } )
 *
 * runs fn iff if_fn returns truthy
 * @param if_fn: T => Boolean
 * @param fn: T => T
 *
 * @return fn: (T => Boolean) => (T => T) => (T => T)
 *         a function that takes a value, 
 *         calls if_fn(value) on it, 
 *         if true, returns another function that takes a function and calls it passing the value
 *         if false, returns another function that takes a function but DOESN'T call it, just returns the value
 */
export const thruIf = <T>(ifFn: FnPred<T>) => (fn: FnT2T<T>): FnT2T<T> => {
  return (value: T): T => ifFn(value) ? fn(value) : value
}

export const promiseMap = <T, K>(mapper: (v: T, i: number, a: T[]) => Promise<K>): (list: T[]) => Promise<K[]> => (list: T[]): Promise<K[]> => {
  return Promise.all(list.map(mapper))
}

export const promiseFilter = <T>(filter: (v: T, i: number, a: T[]) => Promise<boolean>, negate: boolean): (list: T[]) => Promise<T[]> => (list: T[]): Promise<T[]> => {
  return Promise.resolve(list)
    .then(promiseMap(filter))
    .then(filterMap => list.filter((_, index) => !!negate ? !filterMap[index] : filterMap[index]))
}
