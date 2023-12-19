import '@angular/compiler';
import {VERSION} from '@angular/common';

import { RenderContext, ArgsStoryFn } from '@storybook/types';

import {AngularRenderer, LegacyStoryFnAngularReturnType} from './types';

import { RendererFactory } from './angular-beta/RendererFactory';

export const rendererFactory = new RendererFactory();

export const render: ArgsStoryFn<AngularRenderer> = (props) => ({ props });

export async function renderToCanvas(
  { storyFn, showMain, forceRemount, storyContext: { parameters, component } }: RenderContext<AngularRenderer>,
  element: HTMLElement
) {
  showMain();

  const renderer = await rendererFactory.getRendererInstance(element);

  if(parseInt(VERSION.major) >= 14 ) {
    await renderer.render({
      storyFnAngular: storyFn(),
      component,
      forced: !forceRemount,
      targetDOMNode: element,
    });
  }else {
    await renderer.dynamicRender({storyFnAngular: storyFn() as LegacyStoryFnAngularReturnType,
      component,
      parameters,
      forced: !forceRemount,
      targetDOMNode: element,});
  }
}
