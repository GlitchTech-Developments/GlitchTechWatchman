/* eslint-disable @typescript-eslint/no-explicit-any */
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import axios from "axios"

const queryParamsContainer = document.querySelector("[data-query-params]")
const requestHeadersContainer = document.querySelector("[data-request-headers]")

const keyValueTemplate: any = document.querySelector(
  "[data-key-value-template]"
)

const dataURL: any = document.querySelector("[data-url]")
const dataMethod: any = document.querySelector("[data-method]")

const resultStringSpan = document.getElementById("api-result")
const resultDataPre = document.getElementById("api-data")

if (resultDataPre && resultDataPre?.innerHTML.length < 1) {
  resultDataPre.innerHTML = JSON.stringify(
    {
      data: "No data received yet",
    },
    undefined,
    2
  )
}

const dataQueryParamBtn = document.querySelector("[data-add-query-params-btn]")
const dataQueryHeadersBtn = document.querySelector(
  "[data-add-request-headers-btn]"
)

if (dataQueryParamBtn) {
  dataQueryParamBtn.addEventListener("click", () => {
    if (!queryParamsContainer) {
      return
    }
    queryParamsContainer.append(createKeyValuePair())
  })
  if (queryParamsContainer) {
    queryParamsContainer.append(createKeyValuePair())
  }
}

if (dataQueryHeadersBtn) {
  dataQueryHeadersBtn.addEventListener("click", () => {
    if (!requestHeadersContainer) {
      return
    }
    requestHeadersContainer.append(createKeyValuePair())
  })
  if (requestHeadersContainer) {
    requestHeadersContainer.append(createKeyValuePair())
  }
}

function createKeyValuePair() {
  if (!keyValueTemplate) {
    return
  }
  const element = keyValueTemplate.content.cloneNode(true)
  element
    .querySelector("[data-remove-btn]")
    .addEventListener("click", (e: any) => {
      e.target.closest("[data-key-value-pair]").remove()
    })
  return element
}

const form = document.querySelector("[data-form]")
if (form) {
  form.addEventListener("submit", (e: any) => {
    e.preventDefault()

    axios({
      url: dataURL ? dataURL.value : "",
      method: dataMethod ? dataMethod.value : "GET",
      params: keyValuePairsToObject(queryParamsContainer),
      headers: keyValuePairsToObject(requestHeadersContainer),
    }).then((response) => {
      console.log(response)
      if (!resultStringSpan || !resultDataPre) {
        return
      }
      resultStringSpan.innerHTML = response.status.toString()
      resultDataPre.innerHTML = JSON.stringify(response.data, undefined, 2)
    })
  })
}

function keyValuePairsToObject(container: any) {
  const pairs = container.querySelectorAll("[data-key-value-pair]")
  return [...pairs].reduce((data, pair) => {
    const key = pair.querySelector("[data-key]").value
    const value = pair.querySelector("[data-value]").value

    if (key === "") return data
    return { ...data, [key]: value }
  }, {})
}
