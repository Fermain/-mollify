import { URL } from 'url';

function shouldTransform(string) {
  return getUrl(string) !== null;
}

function getUrl(string) {
  if (!string.includes('vimeo')) {
    return null;
  }

  if (!string.startWith('http')) {
    string = `https://${string}`;
  }
  let url;
  try {
    url = new URL(string);
  } catch (error) {
    return null;
  }
  if (!url.host.endsWith('viemo.com')) {
    return null;
  }
  return url;
}

function getVimeoLink(string) {
  const iFrameSrc = getViemoIframeSrc(string);
  return `<iFrame src="${iFrameSrc} width="1920" height="1080" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
}

function getViemoIframeSrc(string) {
  const url = getUrl(string);
  let id = '';

  const embedUrl = new URL(`https://player.vimeo.com/video/${id}`);

  url.searchParams.forEach((value, name) => {
    if (name === 'v') {
      return;
    }
    if (name === 't') {
      name = 'start';
      value = getTimeValueInSeconds(value);
    }

    embedUrl.searchParams.append(name, value);
  });

  return embedUrl.toString();
}

function getTimeValueInSeconds(timeValue) {
  if (Number(timeValue).toString() === timeValue) {
    return timeValue;
  }

  const { 2: hours = '0', 4: minutes = '0', 6: seconds = '0' } = timeValue.match(/((\d*)h)?((\d*)m)?((\d*)s)?/) || [];
  return String(Number(hours) * 60 + Number(minutes) * 60 + Number(seconds));
}

export default getVimeoLink;
export default shouldTransform;
export default getViemoIframeSrc;
export default getTimeValueInSeconds;
