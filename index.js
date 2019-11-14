const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('github_token', { required: true });

        const client = new github.GitHub(token);
        //console.log(`payload: ${JSON.stringify(github.context.payload)}.`);

        const pullRequestNumber = github.context.payload.number;
        const pullRequest = github.context.payload.pull_request;
        console.log(`pullrequest: ${JSON.stringify(pullRequest)}.`);

        const repo = pullRequest.base.repo.name;
        console.log(`repo: ${repo}.`);

        const owner = pullRequest.base.repo.owner;
        console.log(`owner: ${owner.login}.`);
        
        const commentBody = "comment body";
        const response = await client.issues.createComment({
            owner.login,
            repo,
            pullRequestNumber,
            commentBody
        });

        console.log(`This is the given PR: ${pullRequestNumber}.`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();