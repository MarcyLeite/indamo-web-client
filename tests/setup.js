import React from 'react'
import { describe, it } from 'mocha'
import 'chai/register-should'
import sinon from 'sinon'
import { expect } from 'chai'
import ReactThreeTestRenderer from '@react-three/test-renderer'

global.IS_REACT_ACT_ENVIRONMENT = true

global.sinon = sinon
global.React = React
global.describe = describe
global.it = it
global.expect = expect
global.threeRenderer = ReactThreeTestRenderer
