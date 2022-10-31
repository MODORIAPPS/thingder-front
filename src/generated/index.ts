/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

import { IRequestOptions, IRequestConfig, getConfigs, axios } from './serviceOptions';
export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export interface C____P__R {
  /**  */
  phone?: string;

  /**  */
  pin?: string;
}

export interface C____P__R {
  /**  */
  expiration?: number;

  /**  */
  phone?: string;

  /**  */
  token?: string;
}

export interface I____S {}

export interface I_____I {
  /**  */
  src?: string;

  /**  */
  srcSet?: string;
}

export interface L____R {
  /**  */
  email?: string;

  /**  */
  password?: string;
}

export interface L____R {
  /**  */
  email?: string;

  /**  */
  expiration?: number;

  /**  */
  token?: string;
}

export interface M_____E______R {
  /**  */
  brand?: string;

  /**  */
  genCountry?: string;

  /**  */
  genMonth?: number;

  /**  */
  genYear?: number;

  /**  */
  image?: S_____I;

  /**  */
  nickname?: string;

  /**  */
  type?: string;

  /**  */
  uid?: string;
}

export interface M_____L___R {
  /**  */
  members?: M_____E______R[];
}

export interface M_____R {
  /**  */
  brand?: string;

  /**  */
  description?: string;

  /**  */
  genCountry?: string;

  /**  */
  genMonth?: number;

  /**  */
  genYear?: number;

  /**  */
  images?: S_____I[];

  /**  */
  nickname?: string;

  /**  */
  story?: string;

  /**  */
  tag?: string;

  /**  */
  type?: string;

  /**  */
  uid?: string;
}

export interface M____A__V {
  /**  */
  empty?: boolean;

  /**  */
  model?: object;

  /**  */
  modelMap?: object;

  /**  */
  reference?: boolean;

  /**  */
  status?: EnumM____A__VStatus;

  /**  */
  view?: V;

  /**  */
  viewName?: string;
}

export interface P___R {
  /**  */
  relation?: EnumP___RRelation;

  /**  */
  uid?: string;
}

export interface P___R {
  /**  */
  match?: boolean;

  /**  */
  member?: M_____R;
}

export interface R_______R {
  /**  */
  brand?: string;

  /**  */
  description?: string;

  /**  */
  email?: string;

  /**  */
  genCountry?: string;

  /**  */
  genMonth?: number;

  /**  */
  genYear?: number;

  /**  */
  images?: I_____I[];

  /**  */
  nickname?: string;

  /**  */
  password?: string;

  /**  */
  pinToken?: string;

  /**  */
  story?: string;

  /**  */
  tag?: string;

  /**  */
  type?: string;
}

export interface R_______R {
  /**  */
  email?: string;

  /**  */
  expiration?: number;

  /**  */
  token?: string;
}

export interface R {
  /**  */
  description?: string;

  /**  */
  file?: string;

  /**  */
  filename?: string;

  /**  */
  inputStream?: I____S;

  /**  */
  open?: boolean;

  /**  */
  readable?: boolean;

  /**  */
  uri?: string;

  /**  */
  url?: string;
}

export interface S_____I {
  /**  */
  src?: string;

  /**  */
  srcSet?: string;

  /**  */
  uid?: string;
}

export interface S___P__R {
  /**  */
  expireAt?: string;

  /**  */
  phone?: string;
}

export interface V {
  /**  */
  contentType?: string;
}

export interface ______I____R {
  /**  */
  src?: string;

  /**  */
  srcSet?: string;
}
export enum EnumM____A__VStatus {
  'ACCEPTED' = 'ACCEPTED',
  'ALREADY_REPORTED' = 'ALREADY_REPORTED',
  'BAD_GATEWAY' = 'BAD_GATEWAY',
  'BAD_REQUEST' = 'BAD_REQUEST',
  'BANDWIDTH_LIMIT_EXCEEDED' = 'BANDWIDTH_LIMIT_EXCEEDED',
  'CHECKPOINT' = 'CHECKPOINT',
  'CONFLICT' = 'CONFLICT',
  'CONTINUE' = 'CONTINUE',
  'CREATED' = 'CREATED',
  'DESTINATION_LOCKED' = 'DESTINATION_LOCKED',
  'EXPECTATION_FAILED' = 'EXPECTATION_FAILED',
  'FAILED_DEPENDENCY' = 'FAILED_DEPENDENCY',
  'FORBIDDEN' = 'FORBIDDEN',
  'FOUND' = 'FOUND',
  'GATEWAY_TIMEOUT' = 'GATEWAY_TIMEOUT',
  'GONE' = 'GONE',
  'HTTP_VERSION_NOT_SUPPORTED' = 'HTTP_VERSION_NOT_SUPPORTED',
  'IM_USED' = 'IM_USED',
  'INSUFFICIENT_SPACE_ON_RESOURCE' = 'INSUFFICIENT_SPACE_ON_RESOURCE',
  'INSUFFICIENT_STORAGE' = 'INSUFFICIENT_STORAGE',
  'INTERNAL_SERVER_ERROR' = 'INTERNAL_SERVER_ERROR',
  'I_AM_A_TEAPOT' = 'I_AM_A_TEAPOT',
  'LENGTH_REQUIRED' = 'LENGTH_REQUIRED',
  'LOCKED' = 'LOCKED',
  'LOOP_DETECTED' = 'LOOP_DETECTED',
  'METHOD_FAILURE' = 'METHOD_FAILURE',
  'METHOD_NOT_ALLOWED' = 'METHOD_NOT_ALLOWED',
  'MOVED_PERMANENTLY' = 'MOVED_PERMANENTLY',
  'MOVED_TEMPORARILY' = 'MOVED_TEMPORARILY',
  'MULTIPLE_CHOICES' = 'MULTIPLE_CHOICES',
  'MULTI_STATUS' = 'MULTI_STATUS',
  'NETWORK_AUTHENTICATION_REQUIRED' = 'NETWORK_AUTHENTICATION_REQUIRED',
  'NON_AUTHORITATIVE_INFORMATION' = 'NON_AUTHORITATIVE_INFORMATION',
  'NOT_ACCEPTABLE' = 'NOT_ACCEPTABLE',
  'NOT_EXTENDED' = 'NOT_EXTENDED',
  'NOT_FOUND' = 'NOT_FOUND',
  'NOT_IMPLEMENTED' = 'NOT_IMPLEMENTED',
  'NOT_MODIFIED' = 'NOT_MODIFIED',
  'NO_CONTENT' = 'NO_CONTENT',
  'OK' = 'OK',
  'PARTIAL_CONTENT' = 'PARTIAL_CONTENT',
  'PAYLOAD_TOO_LARGE' = 'PAYLOAD_TOO_LARGE',
  'PAYMENT_REQUIRED' = 'PAYMENT_REQUIRED',
  'PERMANENT_REDIRECT' = 'PERMANENT_REDIRECT',
  'PRECONDITION_FAILED' = 'PRECONDITION_FAILED',
  'PRECONDITION_REQUIRED' = 'PRECONDITION_REQUIRED',
  'PROCESSING' = 'PROCESSING',
  'PROXY_AUTHENTICATION_REQUIRED' = 'PROXY_AUTHENTICATION_REQUIRED',
  'REQUESTED_RANGE_NOT_SATISFIABLE' = 'REQUESTED_RANGE_NOT_SATISFIABLE',
  'REQUEST_ENTITY_TOO_LARGE' = 'REQUEST_ENTITY_TOO_LARGE',
  'REQUEST_HEADER_FIELDS_TOO_LARGE' = 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  'REQUEST_TIMEOUT' = 'REQUEST_TIMEOUT',
  'REQUEST_URI_TOO_LONG' = 'REQUEST_URI_TOO_LONG',
  'RESET_CONTENT' = 'RESET_CONTENT',
  'SEE_OTHER' = 'SEE_OTHER',
  'SERVICE_UNAVAILABLE' = 'SERVICE_UNAVAILABLE',
  'SWITCHING_PROTOCOLS' = 'SWITCHING_PROTOCOLS',
  'TEMPORARY_REDIRECT' = 'TEMPORARY_REDIRECT',
  'TOO_EARLY' = 'TOO_EARLY',
  'TOO_MANY_REQUESTS' = 'TOO_MANY_REQUESTS',
  'UNAUTHORIZED' = 'UNAUTHORIZED',
  'UNAVAILABLE_FOR_LEGAL_REASONS' = 'UNAVAILABLE_FOR_LEGAL_REASONS',
  'UNPROCESSABLE_ENTITY' = 'UNPROCESSABLE_ENTITY',
  'UNSUPPORTED_MEDIA_TYPE' = 'UNSUPPORTED_MEDIA_TYPE',
  'UPGRADE_REQUIRED' = 'UPGRADE_REQUIRED',
  'URI_TOO_LONG' = 'URI_TOO_LONG',
  'USE_PROXY' = 'USE_PROXY',
  'VARIANT_ALSO_NEGOTIATES' = 'VARIANT_ALSO_NEGOTIATES'
}
export enum EnumP___RRelation {
  'BLOCK' = 'BLOCK',
  'DISLIKE' = 'DISLIKE',
  'LIKE' = 'LIKE'
}
