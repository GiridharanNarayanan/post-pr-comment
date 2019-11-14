const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const prId = core.getInput('pull_request_id');
        const token = core.getInput('github_token', { required: true });

        const client = new github.GitHub(token);
        const pullRequestNumber = github.context.payload.number;
        const pullRequest = github.context.payload.pull_request;
        const owner = pullRequest.sender;
        console.log(`owner: ${JSON.stringify(owner)}.`);

        const repo = pullRequest.repository.id;
        console.log(`repo: ${JSON.stringify(repo)}.`);

        const commentBody = "comment body";
        const response = await client.issues.createComment({
            owner,
            repo,
            pullRequestNumber,
            commentBody
        });

        console.log(`This is the given PR: ${prId}.`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();