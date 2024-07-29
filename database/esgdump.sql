--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: access; Type: TYPE; Schema: public; Owner: mohor
--

CREATE TYPE public.access AS ENUM (
    'User',
    'Approver 1',
    'Approver 2',
    'Admin',
    'Both'
);


ALTER TYPE public.access OWNER TO mohor;

--
-- Name: states; Type: TYPE; Schema: public; Owner: mohor
--

CREATE TYPE public.states AS ENUM (
    'submitted',
    'saved',
    'missed',
    'al1',
    'al2',
    'dl1',
    'dl2',
    'rectify'
);


ALTER TYPE public.states OWNER TO mohor;

--
-- Name: gri1trig(); Type: FUNCTION; Schema: public; Owner: mohor
--

CREATE FUNCTION public.gri1trig() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO "gri301materials2016" ( "fid")
         VALUES(NEW."fid");
RETURN NEW;
END;
$$;


ALTER FUNCTION public.gri1trig() OWNER TO mohor;

--
-- Name: gri2trig(); Type: FUNCTION; Schema: public; Owner: mohor
--

CREATE FUNCTION public.gri2trig() RETURNS trigger
    LANGUAGE plpgsql
    AS $$          
BEGIN
                                                  
    INSERT INTO "gri302energy2016" ( "fid")
         VALUES(NEW."fid");
RETURN NEW;
END;
$$;


ALTER FUNCTION public.gri2trig() OWNER TO mohor;

--
-- Name: gri3trig(); Type: FUNCTION; Schema: public; Owner: mohor
--

CREATE FUNCTION public.gri3trig() RETURNS trigger
    LANGUAGE plpgsql
    AS $$          
BEGIN
                               
    INSERT INTO "gri303watereffluents2018" ( "fid")
         VALUES(NEW."fid");
RETURN NEW;
END;
$$;


ALTER FUNCTION public.gri3trig() OWNER TO mohor;

--
-- Name: gri5trig(); Type: FUNCTION; Schema: public; Owner: mohor
--

CREATE FUNCTION public.gri5trig() RETURNS trigger
    LANGUAGE plpgsql
    AS $$          
BEGIN
                               
    INSERT INTO "gri305emissions2016" ( "fid")
         VALUES(NEW."fid");
RETURN NEW;
END;
$$;


ALTER FUNCTION public.gri5trig() OWNER TO mohor;

--
-- Name: gri6trig(); Type: FUNCTION; Schema: public; Owner: mohor
--

CREATE FUNCTION public.gri6trig() RETURNS trigger
    LANGUAGE plpgsql
    AS $$          
BEGIN
                               
    INSERT INTO "gri306waste2020" ( "fid")
         VALUES(NEW."fid");
RETURN NEW;
END;
$$;


ALTER FUNCTION public.gri6trig() OWNER TO mohor;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.accounts (
    email character varying(100),
    password character varying(128),
    role public.access,
    bus character varying(10)[],
    uid integer NOT NULL,
    highprivelege boolean
);


ALTER TABLE public.accounts OWNER TO mohor;

--
-- Name: accounts_uid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.accounts_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accounts_uid_seq OWNER TO mohor;

--
-- Name: accounts_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.accounts_uid_seq OWNED BY public.accounts.uid;


--
-- Name: bus; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.bus (
    buid character varying(10) NOT NULL,
    bu character varying(100)
);


ALTER TABLE public.bus OWNER TO mohor;

--
-- Name: co2e; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.co2e (
    fid integer,
    diesel double precision,
    lpg double precision,
    cng double precision,
    flamal26 double precision,
    acetylene double precision,
    electricity double precision
);


ALTER TABLE public.co2e OWNER TO mohor;

--
-- Name: forms; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.forms (
    buid character varying(10),
    ym character varying(90),
    fid integer NOT NULL,
    manhours double precision,
    status public.states DEFAULT 'saved'::public.states,
    redo double precision DEFAULT '-0.5'::numeric
);


ALTER TABLE public.forms OWNER TO mohor;

--
-- Name: forms_fid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.forms_fid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.forms_fid_seq OWNER TO mohor;

--
-- Name: forms_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.forms_fid_seq OWNED BY public.forms.fid;


--
-- Name: gj; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.gj (
    fid integer,
    diesel double precision,
    lpg double precision,
    cng double precision,
    flamal26 double precision,
    acetylene double precision,
    electricity double precision
);


ALTER TABLE public.gj OWNER TO mohor;

--
-- Name: gri301materials2016; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.gri301materials2016 (
    fid integer NOT NULL,
    rawsteel double precision,
    steelpipes double precision,
    othersteel double precision,
    steelshots double precision,
    steelgrit double precision,
    coppergrit double precision,
    weldingconsumables double precision,
    paint double precision,
    thinner double precision,
    complete boolean DEFAULT false
);


ALTER TABLE public.gri301materials2016 OWNER TO mohor;

--
-- Name: gri301materials2016_fid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.gri301materials2016_fid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gri301materials2016_fid_seq OWNER TO mohor;

--
-- Name: gri301materials2016_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.gri301materials2016_fid_seq OWNED BY public.gri301materials2016.fid;


--
-- Name: gri302energy2016; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.gri302energy2016 (
    fid integer NOT NULL,
    diesel double precision,
    gasoline double precision,
    biomethaneliq double precision,
    biomethanecomp double precision,
    lpg double precision,
    lng double precision,
    cng double precision,
    flamal26 double precision,
    acetylene double precision,
    gridelec double precision,
    solarrenewableenergy double precision,
    recsrenewableenergy double precision,
    complete boolean DEFAULT false,
    biodiesel jsonb[]
);


ALTER TABLE public.gri302energy2016 OWNER TO mohor;

--
-- Name: gri302energy2016_fid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.gri302energy2016_fid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gri302energy2016_fid_seq OWNER TO mohor;

--
-- Name: gri302energy2016_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.gri302energy2016_fid_seq OWNED BY public.gri302energy2016.fid;


--
-- Name: gri303watereffluents2018; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.gri303watereffluents2018 (
    fid integer NOT NULL,
    surfacewater double precision,
    groundwater double precision,
    seawater double precision DEFAULT 0,
    producedwater double precision DEFAULT 0,
    thirdpartywaterpotable double precision,
    thirdpartywaternewaterordesal double precision,
    complete boolean DEFAULT false
);


ALTER TABLE public.gri303watereffluents2018 OWNER TO mohor;

--
-- Name: gri303watereffluents2018_fid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.gri303watereffluents2018_fid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gri303watereffluents2018_fid_seq OWNER TO mohor;

--
-- Name: gri303watereffluents2018_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.gri303watereffluents2018_fid_seq OWNED BY public.gri303watereffluents2018.fid;


--
-- Name: gri305emissions2016; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.gri305emissions2016 (
    fid integer NOT NULL,
    co2 double precision,
    r22 double precision,
    r32 double precision,
    r34a double precision,
    r410a double precision,
    r404a double precision,
    r407c double precision,
    r134a double precision,
    r141b double precision,
    r600 double precision,
    complete boolean DEFAULT false
);


ALTER TABLE public.gri305emissions2016 OWNER TO mohor;

--
-- Name: gri305emissions2016_fid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.gri305emissions2016_fid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gri305emissions2016_fid_seq OWNER TO mohor;

--
-- Name: gri305emissions2016_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.gri305emissions2016_fid_seq OWNED BY public.gri305emissions2016.fid;


--
-- Name: gri306waste2020; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.gri306waste2020 (
    fid integer NOT NULL,
    hazwastefrdisposal double precision,
    nonhazwastefrincineration double precision,
    nonhazwastefrlandfill double precision,
    nonhazwastefroffsiterecycling double precision,
    complete boolean DEFAULT false
);


ALTER TABLE public.gri306waste2020 OWNER TO mohor;

--
-- Name: gri306waste2020_fid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.gri306waste2020_fid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gri306waste2020_fid_seq OWNER TO mohor;

--
-- Name: gri306waste2020_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.gri306waste2020_fid_seq OWNED BY public.gri306waste2020.fid;


--
-- Name: logbook; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.logbook (
    time_of_action timestamp without time zone,
    action character varying(200),
    actor character varying(100)
);


ALTER TABLE public.logbook OWNER TO mohor;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.notifications (
    mid integer NOT NULL,
    message character varying(1000),
    buid character varying(10),
    receiver character varying(100),
    details character varying(1000),
    read boolean,
    "time" timestamp without time zone
);


ALTER TABLE public.notifications OWNER TO mohor;

--
-- Name: notifications_mid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.notifications_mid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_mid_seq OWNER TO mohor;

--
-- Name: notifications_mid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.notifications_mid_seq OWNED BY public.notifications.mid;


--
-- Name: remarks; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.remarks (
    fid integer NOT NULL,
    remark character varying(500) NOT NULL,
    rid integer NOT NULL,
    resolvedstate boolean DEFAULT false
);


ALTER TABLE public.remarks OWNER TO mohor;

--
-- Name: remarks_fid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.remarks_fid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.remarks_fid_seq OWNER TO mohor;

--
-- Name: remarks_fid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.remarks_fid_seq OWNED BY public.remarks.fid;


--
-- Name: remarks_rid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.remarks_rid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.remarks_rid_seq OWNER TO mohor;

--
-- Name: remarks_rid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.remarks_rid_seq OWNED BY public.remarks.rid;


--
-- Name: requests; Type: TABLE; Schema: public; Owner: mohor
--

CREATE TABLE public.requests (
    rqid integer NOT NULL,
    bu character varying(10),
    ym character varying(90),
    reason character varying(10000),
    status boolean DEFAULT false,
    acceptance boolean
);


ALTER TABLE public.requests OWNER TO mohor;

--
-- Name: requests_rqid_seq; Type: SEQUENCE; Schema: public; Owner: mohor
--

CREATE SEQUENCE public.requests_rqid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.requests_rqid_seq OWNER TO mohor;

--
-- Name: requests_rqid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mohor
--

ALTER SEQUENCE public.requests_rqid_seq OWNED BY public.requests.rqid;


--
-- Name: accounts uid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.accounts ALTER COLUMN uid SET DEFAULT nextval('public.accounts_uid_seq'::regclass);


--
-- Name: forms fid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.forms ALTER COLUMN fid SET DEFAULT nextval('public.forms_fid_seq'::regclass);


--
-- Name: gri301materials2016 fid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri301materials2016 ALTER COLUMN fid SET DEFAULT nextval('public.gri301materials2016_fid_seq'::regclass);


--
-- Name: gri302energy2016 fid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri302energy2016 ALTER COLUMN fid SET DEFAULT nextval('public.gri302energy2016_fid_seq'::regclass);


--
-- Name: gri303watereffluents2018 fid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri303watereffluents2018 ALTER COLUMN fid SET DEFAULT nextval('public.gri303watereffluents2018_fid_seq'::regclass);


--
-- Name: gri305emissions2016 fid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri305emissions2016 ALTER COLUMN fid SET DEFAULT nextval('public.gri305emissions2016_fid_seq'::regclass);


--
-- Name: gri306waste2020 fid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri306waste2020 ALTER COLUMN fid SET DEFAULT nextval('public.gri306waste2020_fid_seq'::regclass);


--
-- Name: notifications mid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.notifications ALTER COLUMN mid SET DEFAULT nextval('public.notifications_mid_seq'::regclass);


--
-- Name: remarks fid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.remarks ALTER COLUMN fid SET DEFAULT nextval('public.remarks_fid_seq'::regclass);


--
-- Name: remarks rid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.remarks ALTER COLUMN rid SET DEFAULT nextval('public.remarks_rid_seq'::regclass);


--
-- Name: requests rqid; Type: DEFAULT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.requests ALTER COLUMN rqid SET DEFAULT nextval('public.requests_rqid_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.accounts (email, password, role, bus, uid, highprivelege) FROM stdin;
mohor04@gmail.com	zebra	Admin	{B6}	7	f
mohor20@outlook.com	cat	User	{B2}	1	f
p@gmail.com	wolf	Both	{B7}	14	t
pratyb@gmail.com	bird	User	{B2,B1}	3	f
dbmohor2004@gmail.com	dog	Approver 1	{B1}	2	f
r@gmail.com	xyz	User	{B1,B3}	21	f
q@gmail.com	sheep	Approver 1	{B2}	23	f
\.


--
-- Data for Name: bus; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.bus (buid, bu) FROM stdin;
B1	SNE
B2	SOGA
B3	SPMI
B4	SSSI
B5	SNHI
B6	SNS
B7	SFB
B8	SSMB
B9	SAM
B10	TBY
B11	AY
B12	PY
B13	SMS
B14	PTS
B15	PTK
B16	EJA
\.


--
-- Data for Name: co2e; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.co2e (fid, diesel, lpg, cng, flamal26, acetylene, electricity) FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.forms (buid, ym, fid, manhours, status, redo) FROM stdin;
\.


--
-- Data for Name: gj; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.gj (fid, diesel, lpg, cng, flamal26, acetylene, electricity) FROM stdin;
\.


--
-- Data for Name: gri301materials2016; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.gri301materials2016 (fid, rawsteel, steelpipes, othersteel, steelshots, steelgrit, coppergrit, weldingconsumables, paint, thinner, complete) FROM stdin;
\.


--
-- Data for Name: gri302energy2016; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.gri302energy2016 (fid, diesel, gasoline, biomethaneliq, biomethanecomp, lpg, lng, cng, flamal26, acetylene, gridelec, solarrenewableenergy, recsrenewableenergy, complete, biodiesel) FROM stdin;
\.


--
-- Data for Name: gri303watereffluents2018; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.gri303watereffluents2018 (fid, surfacewater, groundwater, seawater, producedwater, thirdpartywaterpotable, thirdpartywaternewaterordesal, complete) FROM stdin;
\.


--
-- Data for Name: gri305emissions2016; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.gri305emissions2016 (fid, co2, r22, r32, r34a, r410a, r404a, r407c, r134a, r141b, r600, complete) FROM stdin;
\.


--
-- Data for Name: gri306waste2020; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.gri306waste2020 (fid, hazwastefrdisposal, nonhazwastefrincineration, nonhazwastefrlandfill, nonhazwastefroffsiterecycling, complete) FROM stdin;
\.


--
-- Data for Name: logbook; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.logbook (time_of_action, action, actor) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.notifications (mid, message, buid, receiver, details, read, "time") FROM stdin;
\.


--
-- Data for Name: remarks; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.remarks (fid, remark, rid, resolvedstate) FROM stdin;
\.


--
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: mohor
--

COPY public.requests (rqid, bu, ym, reason, status, acceptance) FROM stdin;
1	B2	202405	abcd	t	f
2	B2	202405	tyu	t	t
3	B2	202405	abcd	t	t
4	B2	202405	abcd	t	t
5	B2	202405	abcd	t	t
6	B2	202405	swe	t	t
\.


--
-- Name: accounts_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.accounts_uid_seq', 24, true);


--
-- Name: forms_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.forms_fid_seq', 45, true);


--
-- Name: gri301materials2016_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.gri301materials2016_fid_seq', 1, false);


--
-- Name: gri302energy2016_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.gri302energy2016_fid_seq', 1, false);


--
-- Name: gri303watereffluents2018_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.gri303watereffluents2018_fid_seq', 1, false);


--
-- Name: gri305emissions2016_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.gri305emissions2016_fid_seq', 1, false);


--
-- Name: gri306waste2020_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.gri306waste2020_fid_seq', 1, false);


--
-- Name: notifications_mid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.notifications_mid_seq', 1, false);


--
-- Name: remarks_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.remarks_fid_seq', 1, false);


--
-- Name: remarks_rid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.remarks_rid_seq', 16, true);


--
-- Name: requests_rqid_seq; Type: SEQUENCE SET; Schema: public; Owner: mohor
--

SELECT pg_catalog.setval('public.requests_rqid_seq', 6, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (uid);


--
-- Name: bus bus_pkey; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.bus
    ADD CONSTRAINT bus_pkey PRIMARY KEY (buid);


--
-- Name: forms forms_buid_ym_key; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_buid_ym_key UNIQUE (buid, ym);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (fid);


--
-- Name: gri301materials2016 gri301materials2016_fid_key; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri301materials2016
    ADD CONSTRAINT gri301materials2016_fid_key UNIQUE (fid);


--
-- Name: gri302energy2016 gri302energy2016_fid_key; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri302energy2016
    ADD CONSTRAINT gri302energy2016_fid_key UNIQUE (fid);


--
-- Name: gri303watereffluents2018 gri303watereffluents2018_fid_key; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri303watereffluents2018
    ADD CONSTRAINT gri303watereffluents2018_fid_key UNIQUE (fid);


--
-- Name: gri305emissions2016 gri305emissions2016_fid_key; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri305emissions2016
    ADD CONSTRAINT gri305emissions2016_fid_key UNIQUE (fid);


--
-- Name: gri306waste2020 gri306waste2020_fid_key; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri306waste2020
    ADD CONSTRAINT gri306waste2020_fid_key UNIQUE (fid);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (mid);


--
-- Name: remarks remarks_pkey; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.remarks
    ADD CONSTRAINT remarks_pkey PRIMARY KEY (rid);


--
-- Name: accounts uemail; Type: CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT uemail UNIQUE (email);


--
-- Name: forms gri1_insert_trigger; Type: TRIGGER; Schema: public; Owner: mohor
--

CREATE TRIGGER gri1_insert_trigger AFTER INSERT ON public.forms FOR EACH ROW EXECUTE FUNCTION public.gri1trig();


--
-- Name: forms gri2_insert_trigger; Type: TRIGGER; Schema: public; Owner: mohor
--

CREATE TRIGGER gri2_insert_trigger AFTER INSERT ON public.forms FOR EACH ROW EXECUTE FUNCTION public.gri2trig();


--
-- Name: forms gri3_insert_trigger; Type: TRIGGER; Schema: public; Owner: mohor
--

CREATE TRIGGER gri3_insert_trigger AFTER INSERT ON public.forms FOR EACH ROW EXECUTE FUNCTION public.gri3trig();


--
-- Name: forms gri5_insert_trigger; Type: TRIGGER; Schema: public; Owner: mohor
--

CREATE TRIGGER gri5_insert_trigger AFTER INSERT ON public.forms FOR EACH ROW EXECUTE FUNCTION public.gri5trig();


--
-- Name: forms gri6_insert_trigger; Type: TRIGGER; Schema: public; Owner: mohor
--

CREATE TRIGGER gri6_insert_trigger AFTER INSERT ON public.forms FOR EACH ROW EXECUTE FUNCTION public.gri6trig();


--
-- Name: gj fk; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gj
    ADD CONSTRAINT fk FOREIGN KEY (fid) REFERENCES public.forms(fid) ON DELETE CASCADE;


--
-- Name: co2e fk; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.co2e
    ADD CONSTRAINT fk FOREIGN KEY (fid) REFERENCES public.forms(fid) ON DELETE CASCADE;


--
-- Name: gri306waste2020 fk_name; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri306waste2020
    ADD CONSTRAINT fk_name FOREIGN KEY (fid) REFERENCES public.forms(fid) ON DELETE CASCADE;


--
-- Name: gri305emissions2016 fk_name; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri305emissions2016
    ADD CONSTRAINT fk_name FOREIGN KEY (fid) REFERENCES public.forms(fid) ON DELETE CASCADE;


--
-- Name: gri303watereffluents2018 fk_name; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri303watereffluents2018
    ADD CONSTRAINT fk_name FOREIGN KEY (fid) REFERENCES public.forms(fid) ON DELETE CASCADE;


--
-- Name: gri302energy2016 fk_name; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri302energy2016
    ADD CONSTRAINT fk_name FOREIGN KEY (fid) REFERENCES public.forms(fid) ON DELETE CASCADE;


--
-- Name: gri301materials2016 fk_name; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.gri301materials2016
    ADD CONSTRAINT fk_name FOREIGN KEY (fid) REFERENCES public.forms(fid) ON DELETE CASCADE;


--
-- Name: remarks forkey; Type: FK CONSTRAINT; Schema: public; Owner: mohor
--

ALTER TABLE ONLY public.remarks
    ADD CONSTRAINT forkey FOREIGN KEY (fid) REFERENCES public.forms(fid);


--
-- PostgreSQL database dump complete
--

