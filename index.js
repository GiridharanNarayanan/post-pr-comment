const core = require('@actions/core');
const github = require('@actions/github');

try {
    const prId = core.getInput('pull_request_id');
    console.log(`This is the given PR: ${prId}.`);
} catch (error) {
    core.setFailed(error.message);
}