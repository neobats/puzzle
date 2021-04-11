export async function timeout<T extends unknown = unknown>(
  ms: number,
  f: () => Promise<T>,
): Promise<T> {
  const promise = f()

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"))
    }, ms)

    promise.then(resolve, reject)
  })
}

export async function retry<T extends unknown = unknown>(
  count: number,
  f: () => Promise<T>,
): Promise<T> {
  if (count > 0) {
    try {
      return await f()
    } catch (e) {
      return retry(count - 1, f)
    }
  }

  return Promise.reject()
}

type ControlFlowOptions = {
  retry: number
  timeout: number
}

export async function invoke<T extends unknown = unknown>(
  options: ControlFlowOptions,
  f: () => Promise<T>,
) {
  return retry(options.retry || 1, () => timeout(options.timeout || 0, f))
}
