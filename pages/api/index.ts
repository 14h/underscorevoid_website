import express from 'express';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';
import {WebhookEvent} from "@octokit/webhooks-types";

const get_message = (event: WebhookEvent): string | null => {
    if (
        !event
        || !('sender' in event)
        || !('repository' in event)
    ) {
        return null;
    }

    const author_link = event?.sender?.html_url ?? '';
    const author_name = event?.sender?.login ?? '';

    if ('commits' in event) {
        // handle commits

        const commit_count = event?.commits?.length ?? 0;
        const commits = event?.commits ?? [];

        return `⥂ GitHub ⟹ <a href="${author_link}">${author_name}</a> ${event.forced ? 'forced' : ''} pushed (<a href="${event.compare}">${commit_count}</a> commits) to <a href="${event.repository.html_url}">${event.repository.name}</a> (${event.ref}): \n ${commits.map(commit => `-> ${commit.message} (<a href="${commit.url}">${commit.modified.length} files changed</a>) \n`)}`;
    }

    if (
        'pull_request' in event
        && 'commits' in event.pull_request
    ) {

        return `⥂ GitHub ⟹ <a href="${author_link}">${author_name}</a> ${event.action} pull-request to <a href="${event.repository.html_url}">${event.repository.name}</a> with [<a href="${event.pull_request.html_url}/commits">${event.pull_request.commits} commits</a>; <a href="${event.pull_request.html_url}/files">${event.pull_request.changed_files} changed files</a> (+${event.pull_request.additions}/-${event.pull_request.deletions})]\n<a href="${event.pull_request.html_url}">"${event.pull_request.title}" (#${event.pull_request.number})</a>`
    }

    return null;
};

const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('v1/bots/github/gls_ecl_eop', (request, response) => {
    const webhookEvent: WebhookEvent = request.body;

    const message = get_message(webhookEvent);

    if (!message) {
        return true;
    }

    bot.sendMessage(
        process.env.CHANNEL_ID_GLS_EOP,
        message,
        {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        }
    ).then(() =>
        response.send({
            success: true,
        }),
    ).catch((err) => {
        console.error(err);

        response.send({
            success: true,
            err,
        });
    });

    response.send({
        success: true,
    });


    return true;
});

app.get('v1/bots/github/gls_ecl_eop', (request, response) => {


    const message = 'something';
    bot.sendMessage(
        process.env.CHANNEL_ID_GLS_EOP,
        message,
        {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        }
    ).then(() =>
        response.send({
            success: true,
        }),
    ).catch((err) => {
        console.error(err);

        response.send({
            success: true,
            err,
        });
    });

    response.send({
        success: true,
    });


    return true;
});

module.exports = app;
