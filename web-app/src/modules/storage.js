function initLocalStorage() {
  if (!localStorage.getItem('community')) {
    localStorage.setItem('community', JSON.stringify([]));
  }
}

/**
 * 
 * @param {*} member 
 * @param username
 * @param password
 * @param email
 * @param phoneNumber
 */

function isValid(member) {
  if(member.password !== member.re_password)
    throw new Error('passwords dont match');
  if(!(/^\d+$/.test(member.phone)))
    throw new Error('not a valid phone number');
  if((member.username.match(/^[0-9A-Za-z]+$/) === null))
    throw new Error('not a valid username');
  if(!member.email.includes('@'))
    throw new Error('not a valid email');
}

function addCommunityMember(member) {
  isValid(member);
  const l = JSON.parse(localStorage.getItem('community'));
  if(l.some((element) => element.username === member.username))
    throw new Error('username already exists');
  l.push(member);
  localStorage.setItem('community', JSON.stringify(l));
}

function getCommunityMember(username, password) {
  const l = JSON.parse(localStorage.getItem('community'));
  try {
    const member = l.find((element) => element.username === username);
    if(password !== member.password)
      throw new Error('password does not match');
    return member;
  } catch (e) {
    throw new Error('username/password combination does not exist, please sign up');
  }
}

module.exports = {
  initLocalStorage,
  addCommunityMember,
  getCommunityMember,
};