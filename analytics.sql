-- 전체 기간 세션 기준 퍼널. 이탈률은 직전 단계에 도달한 세션 중 다음 단계에 도달하지 않은 비율입니다.
with sessions as (
 select session_id, bool_or(event_name='page_view') visited, bool_or(event_name='ticket_view') ticket,
 bool_or(event_name='checkout_start') checkout, bool_or(event_name='demo_complete') completed
 from public.halloween_events group by session_id
), funnel as (
 select count(*) filter(where visited) visits,
 count(*) filter(where visited and ticket) ticket_views,
 count(*) filter(where visited and ticket and checkout) checkout_starts,
 count(*) filter(where visited and ticket and checkout and completed) demo_completions from sessions
)
select *, round(100.0*(visits-ticket_views)/nullif(visits,0),2) visit_to_ticket_drop_pct,
 round(100.0*(ticket_views-checkout_starts)/nullif(ticket_views,0),2) ticket_to_checkout_drop_pct,
 round(100.0*(checkout_starts-demo_completions)/nullif(checkout_starts,0),2) checkout_to_complete_drop_pct,
 round(100.0*demo_completions/nullif(visits,0),2) demo_conversion_pct from funnel;

select button_id, count(*) clicks, count(distinct session_id) sessions from public.halloween_events
where event_name='button_click' group by button_id order by clicks desc;

select coalesce(properties->>'utm_source','direct') source, count(distinct session_id) sessions
from public.halloween_events where event_name='page_view' group by 1 order by 2 desc;
